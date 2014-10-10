Meteor.methods({
	
	calculateAnimeRatingById: function(animeId) {
		// Get all the library entries for an anime
		// We only need the rating and episodes seen fields
		var libraryEntries = LibraryEntries.find({animeId: animeId}, {fields: {status: 1, rating: 1, episodesSeen: 1}});
		var ratingCounts = {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0, 
			6: 0,
			7: 0,
			8: 0,
			9: 0,
			10: 0
		};

		var totalWeightedRatings = 0;
		var totalWeight = 0;
		var averageRating;
		var totalRatings = 0;

		// We can let other methods be executed, this could take a while 
		this.unblock();


		libraryEntries.forEach(function(libraryEntry) {
			var rating = libraryEntry.rating;
			var episodesSeen = libraryEntry.episodesSeen;
			var status = libraryEntry.status;


			// We don't want to count entries that have status 
			// as plan to watch. Even if they rated the anime,
			// their rating shouldn't really matter
			if (status !== 'Plan to watch') {

				// rating and episodesSeen must exist for the 
				// weighted average to work
				if (rating > 0 && episodesSeen > 0) {
					ratingCounts[rating] += 1;
					totalWeightedRatings += rating * episodesSeen;
					totalWeight += episodesSeen;
					totalRatings++;
				}

			}

		});


		// We only want to calculate the rating 
		// and update the anime if we have data

		if (totalWeightedRatings > 0) {
			// Calculate the weighted average
			// console.log(totalWeightedRatings);
			// console.log(totalWeight);
			averageRating = totalWeightedRatings/totalWeight;

			// console.log("Average Rating for " + animeId + " : " + averageRating);
			// Update the anime with calculated ratings
			Anime.update({_id: animeId}, {$unset: {ratingCount: ""}, $set: {rating: averageRating, totalRatings: totalRatings, ratingCounts: ratingCounts, ratingUpdatedAt: new Date()}});

		}

	}


});