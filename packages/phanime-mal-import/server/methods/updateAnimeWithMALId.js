Meteor.methods({

	'updateAnimeWithMALId' : function() {
		var moment = Npm.require('moment');
		var xml2js = Npm.require('xml2js');
		var parseString = xml2js.parseString;
		var amountMatched = 0;

		Anime.find({}).fetch().forEach(function(anime) {
			// If the id doesn't exist or is blank or empty string, then 
			// we'll query MAL
			if(!anime.myAnimeListId) {
				var resultSearch = HTTP.call("GET", "http://myanimelist.net/api/anime/search.xml?q=" + anime.canonicalTitle, {auth: Meteor.settings.malAPIAuth.username + ":" + Meteor.settings.malAPIAuth.password});
				var malAnimes = resultSearch.content;

				parseString(malAnimes, function(error, result) {
					if (result) {
						var animeReturned = result.anime.entry;
						
						for(var i = 0; i < animeReturned.length; i++) {
							var malAnime = animeReturned[i];
							var malAnimeId = malAnime.id[0];
							var seriesTitle = malAnime.title[0];


							// console.log(malAnime);
							if (anime.canonicalTitle.trim() == malAnime.title[0] || anime.canonicalTitle.trim() == malAnime.english[0]) {
								// If any of the titles match, we're good and we should attach the ids :D 
								// Get the MAL ID :D 

								amountMatched++;

								var updateObj = {
									myAnimeListId: malAnime.id[0]
								};

								if (!anime.startDate || moment(anime.startDate).year() == 0) 
									updateObj.startDate = moment(malAnime.start_date[0]).toDate();

								if (!anime.endDate || moment(anime.endDate).year() == 0)
									updateObj.endDate = moment(malAnime.end_date[0]).toDate();

								console.log(anime.startDate);
								console.log(anime.endDate);

								console.log(updateObj);

								Anime.update({_id: anime._id}, {$set: updateObj});
							}
						}
					}
				});
			
			} else {
				console.log("The mal id already exists its: " + anime.myAnimeListId);
			}

		});


		console.log("Amount of anime matched " + amountMatched);

	}

});