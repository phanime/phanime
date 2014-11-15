IndexController = RouteController.extend({

	onBeforeAction: function () {
		SEO.set({
			title:  siteSettings.title + " " + siteSettings.separator + " " + siteSettings.slogan,
			meta: {
				'description' : 'Phanime is a platform made specifically for anime fans'
			}
		});
		this.next();
	},	

	waitOn: function () {
		return Meteor.subscribe('indexCurrentUser');
	},

	data: function () {
		if (this.ready()) {
			if (Meteor.user()) {
				var libraryEntries = LibraryEntries.find({userId: Meteor.userId(), $or : [{status: 'Watching'}, {status: 'Plan to watch'}]}, {limit: 6, sort: {updatedAt: -1}});
				var recAnimeIds = _.pluck(Meteor.user().recommendedAnime, 'animeId');
				var recommendedAnime = Anime.find({_id: {$in: recAnimeIds}}, {limit: 12});

				var returnObj = {};

				// This will ensure our if conditions work appropriately in templates
				if (recommendedAnime.count() > 0) {
					returnObj.recommendedAnime = recommendedAnime;
				}

				// This will ensure our if conditions work appropriately in templates
				if (libraryEntries.count() > 0) {
					returnObj.libraryEntries = libraryEntries;
				}

				return returnObj;
			}
		}

	}	

});