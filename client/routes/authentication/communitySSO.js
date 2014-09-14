CommunitySSOController = RouteController.extend({
	template: 'loading',
	onBeforeAction: function () {
		// If the user is logged in
		// then we do the authentication for discourse
		// else we send them to the sign in page with the proper query parameters
		var params = this.params;
		var user;
		if (Meteor.user()) {
			console.log(params);
			if (params.sso && params.sig) {
				user = Meteor.user();

				user.avatarImageUrl = user.avatarImageUrl();
				
				// Temporary way to send the user to the right place after verification
				Meteor.call('discourseSSO', params.sso, params.sig, user, function (error, result) {
					console.log(result);
					if (result) {
						// We want to attach a return path in this login since
						// the user is logging in from main application and has no 
						// idea that they are also being authenticated for discourse
						window.location = result;
					}
				});				
			}
		}
	}

});