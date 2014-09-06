Meteor.methods({
	
	generateAnimeRecommendations: function(userId) {
		// Let's grab user's library entries.
		var libraryEntries = LibraryEntries.find({userId: userId}).fetch();
		var recommendedAnime = [];
		libraryEntries.forEach(function(libraryEntry) {
			var anime = Anime.findOne({_id: libraryEntry.animeId});
			// Ignore any entry that's rated below 7, or is dropped
			if (libraryEntry.rating >= 7 && libraryEntry.status !== 'Dropped') {
				var potentialAnime = Anime.find({genres: {$in: anime.genres}}).fetch();
				
				potentialAnime.forEach(function(anime) {
					if (recommendedAnime[anime._id])
						recommendedAnime[anime._id] += 10;
					else 
						recommendedAnime[anime._id] = 10;
				});

			}


		});

		console.log(recommendedAnime.sort(function(a,b) {
			return b-a;
		}));

		// recommendedAnime.sort().reverse();

		// console.log(recommendedAnime);

	}


});

