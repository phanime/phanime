Meteor.methods({
	

	getMALUserList: function(username) {
		var xml2js = Npm.require('xml2js');
		var parseString = xml2js.parseString;
		var result = HTTP.call("GET", "http://myanimelist.net/malappinfo.php?u=" + username + "&status=all&type=anime");
	
		var list = result.content;

		parseString(list, function(error, result) {
			
			// This is an array of anime in the user's list
			var anime = result.myanimelist.anime;

			// console.log(result.myanimelist.anime);

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

				console.log(seriesTitle);
				console.log(seriesId);
				console.log(rewatching);


				// Make a call here to phanime's database to check if the anime exists
				// if it does exist, then create the libraryEntry immediately



				// If the anime doesn't exist then we should make a call to MyAnimeList's API to grab the anime 
				// and add it to the database.
				var resultSearch = HTTP.call("GET", "http://myanimelist.net/api/anime/search.xml?q=" + seriesTitle, {auth: malAPIAuth.username + ":" + malAPIAuth.password});

				var animes = resultSearch.content;

				parseString(animes, function(error, result) {
					var animeReturned = result.anime.entry;

					animeReturned.forEach(function(anime, index, array) {
						var animeId = anime.id[0];

						if (animeId === seriesId) {
							// Series matched (get this information);
							console.log("Series matched :D");
						}

					});
				});

			});


		});
	}


});