RevisionsQueueController = RouteController.extend({

	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("Revisions Queue")
		});
		
		this.next();
	},

	// The subscriptions are handled on the template level


});
