Meteor.methods({
	
	generateAnimeRecommendations: function(userId) {
		// Let's grab user's library entries.
		var libraryEntries = LibraryEntries.find({userId: userId}).fetch();
		
		// These are anime that we cannot recommend again! 
		var animeIdsAlready = _.pluck(libraryEntries, 'animeId');
		var recommendedAnime = {};



		libraryEntries.forEach(function(libraryEntry) {
			var anime = Anime.findOne({_id: libraryEntry.animeId});
			// Ignore any entry that's rated below 7, or is dropped
			if (libraryEntry.rating >= 7 || libraryEntry.status !== 'Dropped') {
				var potentialAnime = Anime.find({genres: {$in: anime.genres}, _id: {$nin: animeIdsAlready}}).fetch();
				
				potentialAnime.forEach(function(anime) {
					if (recommendedAnime[anime._id])
						recommendedAnime[anime._id] += 10;
					else 
						recommendedAnime[anime._id] = 10;
				});

			}


		});


		// We generate recommendation objects from these
		recommendedAnime = _.map(recommendedAnime, function(num, key) {
			// These will later on have multiple metrics
			var obj = {
				animeId: key,
				score: num
			};
			return obj;
		});


		// sort them in desc order
		recommendedAnime = _.sortBy(recommendedAnime, 'score').reverse();

		// Get the top 10 recommendations
		if (recommendedAnime.length > 10) {
			recommendedAnime = recommendedAnime.slice(0, 10);
		}

		// Update the recommendations in the user document
		Meteor.users.update({_id: userId}, {$set: {recommendedAnime: recommendedAnime}});

	}


});

