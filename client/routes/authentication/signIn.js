SignInController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("Sign In"),
			og: {
				'title' : siteSettings.getFullTitle("Sign In"),
			}
		});
	}

});