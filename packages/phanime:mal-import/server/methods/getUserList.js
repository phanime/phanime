Meteor.methods({
	

	getMALUserList: function(username) {

		// The user must be logged in for this function
		if (!Meteor.user())
			throw new Meteor.Error('user-required', 'User must be logged in to import MAL list');

		var xml2js = Npm.require('xml2js');
		var parseString = xml2js.parseString;
		var result = HTTP.call("GET", "http://myanimelist.net/malappinfo.php?u=" + username + "&status=all&type=anime");
	
		var list = result.content;

		// console.log(result.content);

		parseString(list, function(error, result) {
			
			// This is an array of anime in the user's list
			var anime = result.myanimelist.anime;

			var statusMap = {
				"1":'Watching',
				"2":'Completed',
				"3":'On hold',
				"6":'Plan to watch',
				"4":'Dropped'
			};

			anime.forEach(function(anime, index, array) {
				var seriesTitle = anime.series_title[0];
				var seriesId = anime.series_animedb_id[0];

				var episodesSeen = anime.my_watched_episodes[0];
				var startDate = anime.my_start_date[0];
				var finishDate = anime.my_finish_date[0];
				var score = anime.my_score[0];
				// status gives a number, we need to map this 
				// to a specific status
				var status = anime.my_status[0];
				var rewatching = anime.my_rewatching[0];
				var lastUpdated = anime.my_last_updated[0];


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

					if (rewatching == 1) {
						libraryEntry.rewatching = true;
					} else {
						libraryEntry.rewatching = false;
					}


					console.log(libraryEntry);
					if (LibraryEntries.verifyLibraryEntry(libraryEntry) == true && LibraryEntries.generalHelpers.uniqueEntry(libraryEntry) == true) {
						// Once the libraryEntry goes through the verification
						// and is unique
						var libraryEntryReady = LibraryEntries.buildEntry(libraryEntry);

						console.log(libraryEntryReady);

						LibraryEntries.insert(libraryEntryReady, function(error, result) {
							console.log(error);
							console.log(result);
							if (error) 
								throw new Meteor.Error('insert-library-entry-failed', error);
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
	}


});