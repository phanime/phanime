AnimeExploreController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: "Explore Anime | Phanime",
			meta: {
				'description' : 'Explore anime like never before on phanime'
			}
		});

		this.next();
	},

	waitOn: function () {
		// We'll return 4 rows of 6 anime each first
		return Meteor.subscribe('animeExplore', 24, {}, {canonicalTitle: 1});
	},

	data: function () {
		console.log(this.params.query);
		if (this.ready()) {
			return {
				anime: Anime.find({}, {sort: {canonicalTitle: 1}}),
				genres: Genres.find({}).fetch()
			}
		}
	}

});