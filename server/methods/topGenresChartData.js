Meteor.methods({

	topGenresChartData: function(userId) {
		this.unblock();
		// Get the user's library entries
		var libraryEntries  = LibraryEntries.find({userId: userId}, {fields: {animeId: 1}}).fetch();
		// Grab the animeIds from libraryEntries
		var animeIds = _.pluck(libraryEntries, 'animeId');
		// Grab all the anime with their respective genres
		var animes = Anime.find({_id: {$in: animeIds}}, {fields: {genres: 1}}).fetch();

		// let's grab the top genres
		var topGenres = {};

		animes.forEach(function(anime) {

			if (anime.genres && anime.genres.length > 0) {
				anime.genres.forEach(function(genre) {
					if (topGenres[genre]) {
						topGenres[genre]++;
					} else {
						topGenres[genre] = 1;
					}
				});
			}

		});

		// map top genres object into an array ob objects
		topGenres = _.map(topGenres, function(num, key) {
			var obj = {
				name: key,
				count: num
			};
			return obj;
		});

		// Sort by count in descending order
		topGenres = _.sortBy(topGenres, 'count').reverse();

		// Get the top 10 genres
		if (topGenres.length > 10)
			topGenres = topGenres.slice(0, 10);

		// Get the data into high charts compatible for pie charts
		topGenres = _.map(topGenres, function(obj) {
			return _.toArray(obj);
		});

		return topGenres;
	}
	
});