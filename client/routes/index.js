IndexController = RouteController.extend({

	onBeforeAction: function () {
		SEO.set({
			title:  siteSettings.title + " " + siteSettings.separator + " " + siteSettings.slogan,
			meta: {
				'description' : 'Phanime is a platform made specifically for anime fans'
			}
		});
		this.next();
	}
});