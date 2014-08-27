Meteor.methods({
	
	calculateAnimeRatingById: function(animeId) {
		// Get all the library entries for an anime
		// We only need the rating and episodes seen fields
		var libraryEntries = LibraryEntries.find({animeId: animeId}, {fields: {status: 1, rating: 1, episodesSeen: 1}});
		var ratingCounts = {};
		var averageRating, totalRating, totalWeight;

		libraryEntries.forEach(function(libraryEntry) {
			var rating = libraryEntry.rating;
			var episodesSeen = libraryEntry.episodesSeen;
			var status = libraryEntry.status;


			// We don't want to count entries that have status 
			// as plan to watch. Even if they rated the anime,
			// their rating will not be counted
			if (status !== 'Plan to watch') {

				// rating and episodesSeen must exist for the 
				// weighted average to work
				if (rating > 0 && episodesSeen > 0) {
					ratingCounts[rating] += 1;
					totalRating = rating * episodesSeen;
					totalWeight += episodesSeen;
				}

			}

		});

		// Calculate the weighted average
		averageRating = totalRating/totalWeight;

		// Update the anime with calculated ratings
		Anime.update({_id: animeId}, {$set: {rating: averageRating, ratingCounts: ratingCounts, ratingUpdatedAt: new Date()}});

	}


});