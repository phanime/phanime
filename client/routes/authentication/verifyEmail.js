VerifyEmailController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("Verify Email"),
			og: {
				'title' : siteSettings.getFullTitle("Verify Email"),
			}
		});

		// User needs to be logged in & all emails have to not be verified
		if (Meteor.user()) {
			var user = Meteor.user();
			var allNotVerified = true;
			user.emails.forEach(function(element) {
				if (element.verified === true) {
					allNotVerified = false;
				}
			});

			// We've got one email that's verified
			// and we're good, so we'll move the user to 
			// the index route.
			if (allNotVerified === false) {
				Router.go('index');
			}

		} else {
			Router.go('signIn');
		}

		// If we've got to here then all emails are not verified

		this.next();
	}

});