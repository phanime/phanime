IndexController = RouteController.extend({
	
	waitOn: function () {
		return Meteor.subscribe('libraryEntriesLatest');
	},

	data: function () {
		return LibraryEntries.find({userId: Meteor.userId()}, {sort: {updatedAt: -1}});
	}	

});