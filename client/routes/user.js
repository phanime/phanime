UserController = RouteController.extend({
	
	onBeforeAction: function () {
		console.log('Thing are going well');
	},

	onAfterAction: function () {
		console.log('Everything worked');
	},

	waitOn: function () {
		return Meteor.subscribe('user', this.params.username);
	},

	data: function () {
		return Meteor.users.findOne({username: this.params.username});
	}

});