IndexController = RouteController.extend({

	onBeforeAction: function () {
		SEO.set({
			title:  siteSettings.title + " " + siteSettings.separator + " " + siteSettings.slogan,
			meta: {
				'description' : 'Phanime is a platform made specifically for anime fans'
			}
		});
	},	

	waitOn: function () {
		return Meteor.subscribe('index', Meteor.user().username);
	},

	data: function () {
		
		var libraryEntries = LibraryEntries.find({userId: Meteor.userId(), $or : [{status: 'Watching'}, {status: 'Plan to watch'}]}, {limit: 6, sort: {updatedAt: -1}});
		var recAnimeIds = _.pluck(Meteor.user().recommendedAnime, 'animeId');
		var recommendedAnime = Anime.find({_id: {$in: recAnimeIds}});

		return {
			libraryEntries: libraryEntries,
			recommendedAnime: recommendedAnime
		};
	}	

});