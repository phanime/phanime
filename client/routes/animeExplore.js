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

	// onAfterAction: function () {
	// },

	waitOn: function () {
		// We'll return 4 rows of 6 anime each first
		return Meteor.subscribe('animeExplore', 24);
	},

	data: function () {
		if (this.ready()) {
			return Anime.find({}, {sort: {canonicalTitle: 1}});
		}
	}

});