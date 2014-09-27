CommunitySSOController = RouteController.extend({
	template: 'communitySSO',
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

				// Temporary addition here since for some reason the server 
				// isn't able to recognize the collection helpers
				user.avatarImageUrl = user.avatarImageUrl();

				
				// Temporary way to send the user to the right place after verification
				Meteor.call('discourseSSO', params.sso, params.sig, user, function (error, result) {
					if (result) {
						// Since the user is logging in from main application and has no 
						// idea that they are also being authenticated for discourse we 
						// will bring them back to the index route (this is done in the signIn event)
						console.log(result);


						// Window location seems to be very inconsistent and 
						// most of the times ends up throwing a timeout on discourse's end 
						// so this will be a temp fix for now.
						$('#communitySSO').attr('href', result);
						// window.location = result;
					}
				});				
			}
		} else {
			// If the user isn't logged in then we should copy the params and send them to the signIn route
			Router.go('signIn', {}, {query: {sso: params.sso, sig: params.sig}}); 
		}
	}

});