Meteor.methods({
	
	generateAnimeRecommendations: function(userId) {
		// Let's grab user's library entries.
		var libraryEntries = LibraryEntries.find({userId: userId}).fetch();
		
		// These are anime that we cannot recommend again! 
		var animeIdsAlready = _.pluck(libraryEntries, 'animeId');
		var recommendedAnime = {};



		libraryEntries.forEach(function(libraryEntry) {
			var anime = Anime.findOne({_id: libraryEntry.animeId});
			// Ignore any entry that's rated below 7..
			// ideally we want to get the average rating of this user
			// and then use that number as our base rating. Since there 
			// aren't many users with lots of ratings, we'll just use 7

			// We also don't want to recommend anime that are similar to the ones 
			// the user has dropped, so we shouldn't look at their dropped anime
			if (libraryEntry.rating >= 7 || libraryEntry.status !== 'Dropped') {
				var potentialAnime = Anime.find({genres: {$in: anime.genres}, _id: {$nin: animeIdsAlready}}, {fields: {_id: 1}}).fetch();
				
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

			// We'll need to query all the anime again

			var obj = {
				animeId: key,
				score: num
			};
			return obj;
		});


		// We should grab all the anime we need here
		var animeWeNeed = Anime.find({_id: {$in: _.pluck(recommendedAnime, 'animeId')}}, {fields: requireCollectionFields.anime.imageAndTitle}).fetch();


		// console.log(animeWeNeed);

		recommendedAnime = _.map(recommendedAnime, function(obj) {
			console.log(obj);

			obj.anime = _.find(animeWeNeed, function(anime) {

				return anime._id === obj.animeId;
			});

			return obj;

		});

		// console.log(recommendedAnime);

		// sort them in desc order
		recommendedAnime = _.sortBy(recommendedAnime, 'score').reverse();

		// Get the top 10 recommendations
		if (recommendedAnime.length > 12) {
			recommendedAnime = recommendedAnime.slice(0, 12);
		}

		// Update the recommendations in the user document
		Meteor.users.update({_id: userId}, {$set: {recommendedAnime: recommendedAnime}});

	}


});

