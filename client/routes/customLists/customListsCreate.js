CustomListsCreateController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("Create Custom List"),
			meta: {
				'description' : "Create your own personalized list"
			},
			og: {
				'title' : siteSettings.getFullTitle("Create Custom List"),
				'description' : "Create your own personalized list"
			}
		});

		this.next();
	}

});