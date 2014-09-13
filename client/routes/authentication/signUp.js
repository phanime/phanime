SignUpController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: "Sign Up " + siteSettings.separator + " " + siteSettings.title,
			og: {
				'title' : "Sign Up " + siteSettings.separator + " " + siteSettings.title,
			}
		});
	}

});