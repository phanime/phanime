IndexController = RouteController.extend({
	
	waitOn: function () {
		return Meteor.subscribe('libraryEntriesIndexLatest');
	},

	data: function () {
		return LibraryEntries.find({userId: Meteor.userId(), $or : [{status: 'Watching'}, {status: 'Plan to watch'}]}, {limit: 6, sort: {updatedAt: -1}});
	}	

});