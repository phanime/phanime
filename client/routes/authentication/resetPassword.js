ResetPasswordController = RouteController.extend({
	
	onBeforeAction: function () {
		console.log(this.params.token);
		// this check is extremely weak (not really for security purposes)
		if (!this.params.token || this.params.token.length < 10) {
			// if a token doesn't exist
			// we'll just send them to forgotPassword route
			Router.go('forgotPassword', {query: ''});
		}


		SEO.set({
			title: siteSettings.getFullTitle("Reset Password"),
			og: {
				'title' : siteSettings.getFullTitle("Reset Password"),
			}
		});

		this.next();
	},
	data: function() {		
		return {
			token: this.params.token
		};

	}


});