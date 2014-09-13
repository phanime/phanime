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
		return Meteor.subscribe('libraryEntriesIndexLatest');
	},

	data: function () {
		return LibraryEntries.find({userId: Meteor.userId(), $or : [{status: 'Watching'}, {status: 'Plan to watch'}]}, {limit: 6, sort: {updatedAt: -1}});
	}	

});