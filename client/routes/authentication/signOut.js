SignOutController = RouteController.extend({
	
	onBeforeAction: function () {
		Meteor.logout(function(error) {
			if (!error) {
				Router.go('index');
			}
		});
	}

});