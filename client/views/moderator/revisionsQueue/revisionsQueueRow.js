Template.revisionsQueueRow.created = function() {
	this.isExpanded = new ReactiveVar(false);
};


Template.revisionsQueueRow.isExpanded = function() {
	return Template.instance().isExpanded.get();
};



Template.revisionsQueueRow.events({

	'click tr.queueRow' : function(event, template) {

		template.isExpanded.set(!template.isExpanded.get());

	},

	'click .approveRevision' : function(event, template) {

		var revision = template.data;

		// Approving the revision basically means we'll be adding the updated data to our database
		Meteor.call('revisionApproved', revision, function(error, result) {

			if (error) {
				Notifications.error('Revision couldn\'t be approved', error.result);
			} else {
				Notifications.success('Revision approved', 'Revision was successfully approved, the changes are now live');
			}

		});

		// We also update the revision's status to Approved here
		Revisions.update({_id: revision._id}, {$set: {status: "Approved", descicionByUsername: Meteor.user().username, descionByUserId: Meteor.user()._id}});

	},

	'click .declineRevision' : function(event, template) {



		var revision = template.data;

		var imageUrl = "http://upload.wikimedia.org/wikipedia/commons/4/4e/Pleiades_large.jpg";

		Meteor.call('uploadImageFromUrl', imageUrl, 'characters', 'cover', '123', function(error, result) {
			console.log(error);
			console.log(result);
		});

		// We update the revision's status to Declined here
		Revisions.update({_id: revision._id}, {$set: {status: "Declined", descicionByUsername: Meteor.user().username, descionByUserId: Meteor.user()._id}});



	}

});