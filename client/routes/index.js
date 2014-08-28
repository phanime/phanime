IndexController = RouteController.extend({
	
	onBeforeAction: function () {
		console.log('This is the index');
	},

	onAfterAction: function () {

	},

	waitOn: function () {
		return Meteor.subscribe('libraryEntriesLatest');
	},

	data: function () {
		return LibraryEntries.find({userId: Meteor.userId()}, {limit: 6});
	}	

});