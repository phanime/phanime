UserController = RouteController.extend({

	waitOn: function () {
		return Meteor.subscribe('user', this.params.username);
	},

	data: function () {
		return Meteor.users.findOne({username: this.params.username});
	}

});