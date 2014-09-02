IndexController = RouteController.extend({

	onBeforeAction: function () {
		SEO.set({
			title: "Phanime | Discover anime like never before",
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