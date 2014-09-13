SignInController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: "Sign In " + siteSettings.separator + " " + siteSettings.title,
			og: {
				'title' : "Sign In " + siteSettings.separator + " " + siteSettings.title,
			}
		});
	}

});