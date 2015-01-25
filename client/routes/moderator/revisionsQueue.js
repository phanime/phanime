RevisionsQueueController = RouteController.extend({

	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("Revisions Queue")
		});
		
		this.next();
	},

	waitOn: function () {
		return Meteor.subscribe('revisionsQueue', 20);
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
