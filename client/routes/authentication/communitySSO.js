CommunitySSOController = RouteController.extend({
	template: 'loading',
	onBeforeAction: function () {
		// If the user is logged in
		// then we do the authentication for discourse
		// else we send them to the sign in page with the proper query parameters
		var params = this.params;
		var user;
		if (Meteor.user() || Meteor.loggingIn()) {
			console.log(params);
			if (params.sso && params.sig && Meteor.user()) {
				user = Meteor.user();


				user.avatarImageUrl = user.avatarImageUrl();
				console.log(user.avatarImageUrl);

				
				// Temporary way to send the user to the right place after verification
				Meteor.call('discourseSSO', params.sso, params.sig, user, function (error, result) {
					console.log(result);
					if (result) {
						// Since the user is logging in from main application and has no 
						// idea that they are also being authenticated for discourse we 
						// will bring them back to the index route (this is done in the signIn event)
						window.location = result;
					}
				});				
			}
		} else {
			// If the user isn't logged in then we should copy the params and send them to the signIn route
			Router.go('signIn', {}, {query: {sso: params.sso, sig: params.sig}}); 
		}
	}

});