SignUpController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("Sign Up"),
			og: {
				'title' : siteSettings.getFullTitle("Sign Up"),
			}
		});
	}

});