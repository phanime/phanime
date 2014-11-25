ForgotPasswordController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("Forgot Password"),
			og: {
				'title' : siteSettings.getFullTitle("Forgot Password"),
			}
		});

		this.next();
	}

});