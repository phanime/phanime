RevisionsQueueController = RouteController.extend({

	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("Revisions Queue")
		});
	},

	waitOn: function () {
		return Meteor.subscribe('revisionsQueue');
	},

	data: function () {
		return Revisions.find({}, {sort: {createdAt: -1}});
	}


});
