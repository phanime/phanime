Meteor.methods({
	

	getMALUserList: function(xmlContent) {

		// The user must be logged in for this function
		if (!Meteor.user())
			throw new Meteor.Error('user-required', 'User must be logged in to import MAL list');

		var xml2js = Npm.require('xml2js');
		var parseString = xml2js.parseString;
		var moment = Npm.require('moment');
		// var result = HTTP.call("GET", "http://myanimelist.net/malappinfo.php?u=" + username + "&status=all&type=anime");

		// var list = result.content;

		// We'll grab all the errors in here that we'll return to the user after.
		var failedImports = [];
		var notFoundAnime = [];
		var importStats = {
			successfullyImported: 0,
			failedImports: 0,
			notFound: 0,
			total: 0,
			alreadyInYourLibrary: 0
		};

		parseString(xmlContent, function(error, result) {

			if (result === undefined)
				throw new Meteor.Error('mal-import-failed', 'Unable to get user\'s MAL list');
		

			if (result.myanimelist === undefined || result.myanimelist.anime === undefined) 
				throw new Meteor.Error('mal-import-failed', 'File format doesn\'t look right');
			
			// This is an array of anime in the user's list
			var anime = result.myanimelist.anime;



			var statusMap = {
				"Watching":'Watching',
				"Completed":'Completed',
				"On-Hold":'On hold',
				"Plan to Watch":'Plan to watch',
				"Dropped":'Dropped'				
			};

			// Loops through all the anime it finds and adds 
			// them to your current library entries if they 
			// exist, it will not update your current library
			// entries!
			anime.forEach(function(anime, index, array) {

				// if a weird file was given or the file format doesn't match
				// we'll throw an error
				if (!anime.series_title || !anime.series_animedb_id || !anime.my_watched_episodes || !anime.my_start_date || !anime.my_finish_date || !anime.my_score || !anime.my_status || !anime.my_rewatching || !anime.my_comments)
					throw new Meteor.Error('mal-import-failed', 'XML file format is different than expected');

				// increment import total stats 
				importStats.total++;

				var seriesTitle = anime.series_title[0];
				var seriesId = anime.series_animedb_id[0];

				var episodesSeen = anime.my_watched_episodes[0];
				var startDate = anime.my_start_date[0];
				var finishDate = anime.my_finish_date[0];
				var score = anime.my_score[0];
				// status is slightly different, we need to map this 
				// to a specific status
				var status = anime.my_status[0];
				var rewatching = anime.my_rewatching[0];
				var comments = anime.my_comments[0];


				// Initialize the object with the required fields
				var libraryEntry = {
					userId: Meteor.userId(),
					type: 'anime',
					status: statusMap[status],
				};

				// add any additional fields
				if (parseInt(score) > 0)
					libraryEntry.rating = parseInt(score);

				if (parseInt(episodesSeen) > 0)
					libraryEntry.episodesSeen = parseInt(episodesSeen);

				// we'll take a truncated version of the comments
				// if they exist
				if (comments.length > 0)
					libraryEntry.comments = comments.substr(0, 140);

				if (rewatching == 1) {
					libraryEntry.rewatching = true;
				} else {
					libraryEntry.rewatching = false;
				}

				// Make a call here to phanime's database to check if the anime exists
				// if it does exist, then create the libraryEntry immediately
				var localAnimeObject = Anime.findOne({$or: [{canonicalTitle: seriesTitle}, {englishTitle: seriesTitle}, {romajiTitle: seriesTitle}, {slug: getSlug(seriesTitle)}, {myAnimeListId: seriesId}]});
				// console.log(localAnimeObject);

				if (localAnimeObject) {
					console.log(seriesTitle + "was found in the database");
					// if we found an anime in our database
					// then we'll create the library entry for the user right away
					// We'll add animeId to the libraryEntry object

					libraryEntry.animeId = localAnimeObject._id;
					libraryEntry.canonicalTitle = localAnimeObject.canonicalTitle;

					if (LibraryEntries.generalHelpers.uniqueEntry(libraryEntry) === true) {
						// libraryEntry is unique
						// verification will be done on insert
						// we'll also do verification before to track
						// all the failed imports

						// console.log(LibraryEntries.simpleSchema().namedContext().invalidKeys());

						// we need to make sure we clean the object before we validate it
						LibraryEntries.simpleSchema().clean(libraryEntry);
						// Let's do the validation before as well 
						if (LibraryEntries.simpleSchema().namedContext().validate(libraryEntry) === false) {
							// if validation failed, we should continue on with adding the entries, but we should push the invalid keys object into an array.
							importStats.failedImports++;

							var invalidKeys = LibraryEntries.simpleSchema().namedContext().invalidKeys();
							var invalidKeysObject = {
								invalidKeys: invalidKeys,
								canonicalTitle: localAnimeObject.canonicalTitle
							};

							// console.log(invalidKeys);
							failedImports.push(invalidKeysObject);

							// throw new Meteor.Error('insert-library-entry-failed', "We were unable to add " + localAnimeObject.canonicalTitle + " to your library. Phanime's database likely has conflicting information. Please update this anime in our database if the information is incorrect. Thanks!");
						} else {
							LibraryEntries.insert(libraryEntry, function(error, result) {
								if (error) {
									console.log(libraryEntry);
									console.log(localAnimeObject.canonicalTitle);
									console.log(error);
									// throw new Meteor.Error('insert-library-entry-failed', error);
								} else {
									// increment the counter here
									importStats.successfullyImported++;
								}
							});
						}

					} else {
						// already in your library (increment that counter)
						importStats.alreadyInYourLibrary++;
					}
				} else {
					console.log(seriesTitle + "was not found, so we are going to call MAL api");
					// If the anime doesn't exist then we should make a call to MyAnimeList's API to grab the anime 
					// and add it to the database.




					importStats.notFound++;



					// var resultSearch = HTTP.call("GET", "http://myanimelist.net/api/anime/search.xml?q=" + seriesTitle, {auth: Meteor.settings.malAPIAuth.username + ":" + Meteor.settings.malAPIAuth.password});

					// var animes = resultSearch.content;

					// var animeStatusMap = {
					// 	"Finished Airing": "Complete",
					// 	"Currently Airing": "On-going",
					// 	"Not yet aired": "Not Yet Aired"
					// };

					// parseString(animes, function(error, result) {
					// 	var animeReturned = result.anime.entry;
						
					// 	for(var i = 0; i < animeReturned.length; i++) {
					// 		var anime = animeReturned[i];
					// 		var malAnimeId = anime.id[0];

					// 		if (malAnimeId === seriesId) {
					// 			// Series matched, let's get more information

					// 			var animeObj = {
					// 				canonicalTitle: anime.title[0], 
					// 				romajiTitle: anime.title[0], // MAL seems to always put the romaji version as their main title
					// 				englishTitle: anime.english[0],
					// 				type: anime.type[0],
					// 				status: animeStatusMap[anime.status[0]],
					// 				// Dates we'll likely cause an issue, but we'll see what happens
					// 				startDate: moment(anime.start_date[0]).toDate(),
					// 				endDate: moment(anime.end_date[0]).toDate(),
					// 				totalEpisodes: anime.episodes[0],
					// 				languageVersion: ['Subbed'], // Assume that it's subbed
					// 				ageRating: "NR - Not Rated",
					// 				titleSynonyms: anime.synonyms[0],
					// 				description: sanitizeDescription(anime.synopsis[0]),
					// 				newImageURLFormat: true,
					// 				myAnimeListScore: parseFloat(anime.score[0]),
					// 				importFromMyAnimeList: true,
					// 				myAnimeListId: malAnimeId
					// 			};

					// 			console.log(animeObj);
					// 			var animeId = Anime.insert(animeObj);


					// 			var coverImageUrl = anime.image[0]; // We'll need to upload this to our server and then update


					// 			if (animeId && coverImageUrl) {
					// 				console.log('We\'re about to upload the image');
					// 				Meteor.call("uploadImageFromUrl", coverImageUrl, 'anime', 'cover', animeId, function(error, result) {
					// 					if (error) {
					// 						throw new Meteor.Error(403, error.reason);
					// 					} else {
					// 						console.log('Upload was successful');
					// 					}
					// 				});
					// 			}


					// 			// We'll add animeId to the libraryEntry object
					// 			libraryEntry.animeId = animeId;
					// 			libraryEntry.canonicalTitle = animeObj.canonicalTitle;

					// 			// We should now create a library entry for this person 
					// 			LibraryEntries.simpleSchema().clean(libraryEntry);
					// 			// Let's do the validation before as well 
					// 			if (LibraryEntries.simpleSchema().namedContext().validate(libraryEntry) === false) {
					// 				// if validation failed, we should continue on with adding the entries, but we should push the invalid keys object into an array.
					// 				importStats.failedImports++;

					// 				var invalidKeys = LibraryEntries.simpleSchema().namedContext().invalidKeys();
					// 				var invalidKeysObject = {
					// 					invalidKeys: invalidKeys,
					// 					canonicalTitle: localAnimeObject.canonicalTitle
					// 				};

					// 				// console.log(invalidKeys);
					// 				failedImports.push(invalidKeysObject);

					// 				// throw new Meteor.Error('insert-library-entry-failed', "We were unable to add " + localAnimeObject.canonicalTitle + " to your library. Phanime's database likely has conflicting information. Please update this anime in our database if the information is incorrect. Thanks!");
					// 			} else {
					// 				LibraryEntries.insert(libraryEntry, function(error, result) {
					// 					if (error) {
					// 						console.log(libraryEntry);
					// 						console.log(localAnimeObject.canonicalTitle);
					// 						console.log(error);
					// 						// throw new Meteor.Error('insert-library-entry-failed', error);
					// 					} else {
					// 						// increment the counter here
					// 						importStats.successfullyImported++;
					// 					}
					// 				});
					// 			}	
					// 			// We don't care about the rest if we've found a match
					// 			// so we'll end this loop	
					// 			break;
					// 		}							
					// 	}
					// });
				}
			});
		});


		return {
			failedImports: failedImports,
			notFoundAnime: notFoundAnime,
			importStats: importStats
		};
	}


});