PeopleController = RouteController.extend({
	
	onBeforeAction: function () {
		console.log('Thing are going well');
	},

	onAfterAction: function () {
		console.log('Everything worked');
	},

	waitOn: function () {
		return Meteor.subscribe('people');
	},

	data: function () {
		return People.find({}, {sort: {createdAt: -1}});
	}

});