Meteor.methods({
	

	getMALUserList: function(xmlContent) {

		// The user must be logged in for this function
		if (!Meteor.user())
			throw new Meteor.Error('user-required', 'User must be logged in to import MAL list');

		var xml2js = Npm.require('xml2js');
		var parseString = xml2js.parseString;
		// var result = HTTP.call("GET", "http://myanimelist.net/malappinfo.php?u=" + username + "&status=all&type=anime");

		// var list = result.content;

		// We'll grab all the errors in here that we'll return to the user after.
		var failedImports = [];

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
					throw new Meteor.Error('mal-import-failed', 'XML file format is different then expected');


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


				// Make a call here to phanime's database to check if the anime exists
				// if it does exist, then create the libraryEntry immediately
				var localAnimeObject = Anime.findOne({$or: [{canonicalTitle: seriesTitle}, {englishTitle: seriesTitle}, {romajiTitle: seriesTitle}, {myAnimeListId: seriesId}]});
				// console.log(localAnimeObject);

				if (localAnimeObject) {
					// if we found an anime in our database
					// then we'll create the library entry for the user right away

					// Initialize the object with the required fields
					var libraryEntry = {
						userId: Meteor.userId(), // we could also use this.userId here I guess...
						animeId: localAnimeObject._id,
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


					if (LibraryEntries.generalHelpers.uniqueEntry(libraryEntry) === true) {
						// libraryEntry is unique
						// verification will be done on insert
						// we'll also do verification before to track
						// all the failed imports



						console.log(LibraryEntries.simpleSchema().namedContext().invalidKeys());

						// Let's do the validation before as well 
						if (LibraryEntries.simpleSchema().namedContext().validate(libraryEntry) === false) {
							// if validation failed, we should continue on with adding the entries, but we should push the invalid keys object into an array.
							var invalidKeys = LibraryEntries.simpleSchema().namedContext().invalidKeys();
							invalidKeys.push(localAnimeObject.canonicalTitle);

							console.log(invalidKeys);
							failedImports.push(invalidKeys);

							// throw new Meteor.Error('insert-library-entry-failed', "We were unable to add " + localAnimeObject.canonicalTitle + " to your library. Phanime's database likely has conflicting information. Please update this anime in our database if the information is incorrect. Thanks!");
						}

						LibraryEntries.insert(libraryEntry, function(error, result) {
							if (error) {
								console.log(libraryEntry);
								console.log(localAnimeObject.canonicalTitle);
								console.log(error);
								// throw new Meteor.Error('insert-library-entry-failed', error);
							}
						});

					}

				}
				// If the anime doesn't exist then we should make a call to MyAnimeList's API to grab the anime 
				// and add it to the database.
				// var resultSearch = HTTP.call("GET", "http://myanimelist.net/api/anime/search.xml?q=" + seriesTitle, {auth: malAPIAuth.username + ":" + malAPIAuth.password});

				// var animes = resultSearch.content;

				// parseString(animes, function(error, result) {
				// 	var animeReturned = result.anime.entry;

				// 	animeReturned.forEach(function(anime, index, array) {
				// 		var animeId = anime.id[0];

				// 		if (animeId === seriesId) {
				// 			// Series matched (get this information);
				// 			console.log("Series matched :D");
				// 		}

				// 	});
				// });
			});
		});


		return failedImports;
	}


});