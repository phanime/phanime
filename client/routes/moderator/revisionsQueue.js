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
		var revisions = Revisions.find({}, {sort: {createdAt: -1}}).fetch();

		revisions.forEach(function(revision) {
			// This is mainly done so the content context also has the revisionId available
			revision.content.revisionId = revision._id;
			
		});


		return revisions;
	}


});
