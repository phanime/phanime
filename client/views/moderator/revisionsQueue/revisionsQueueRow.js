Template.revisionsQueueRow.created = function() {
	this.isExpanded = new ReactiveVar(false);
};


Template.revisionsQueueRow.isExpanded = function() {
	return Template.instance().isExpanded.get();
};


Template.revisionsQueueRow.approveButton = function() {

	var template = Template.instance();
	var revision = template.data;

	if (revision.status === "Open" || revision.status === "Declined") {
		return true;
	} else {
		return false;
	}
};


Template.revisionsQueueRow.declineButton = function() {

	var template = Template.instance();
	var revision = template.data;

	if (revision.status === "Open") {
		return true;
	} else {
		return false;
	}

};


Template.revisionsQueueRow.reopenButton = function() {
	var template = Template.instance();
	var revision = template.data;

	if (revision.status === "Declined") {
		return true;
	} else {
		return false;
	}
};


Template.revisionsQueueRow.events({

	'click tr.queueRow' : function(event, template) {

		template.isExpanded.set(!template.isExpanded.get());

	},

	'click .approveRevision' : function(event, template) {

		var revision = template.data;

		// Approving the revision basically means we'll be adding the updated data to our database
		Meteor.call('revisionApproved', revision, function(error, contentId) {

			if (error) {
				Notifications.error('Revision couldn\'t be approved', error.reason);
			} else {
				Notifications.success('Revision approved', 'Revision was successfully approved, the changes are now live');
			}

		});

		// We also update the revision's status to Approved here
		Revisions.update({_id: revision._id}, {$set: {status: "Approved", descicionByUsername: Meteor.user().username, descionByUserId: Meteor.user()._id}});

	},

	'click .declineRevision' : function(event, template) {

		var revision = template.data;

		// We update the revision's status to Declined here
		Revisions.update({_id: revision._id}, {$set: {status: "Declined", descicionByUsername: Meteor.user().username, descionByUserId: Meteor.user()._id}});


	},
	'click .reopenRevision' : function(event, template) {

		var revision = template.data;

		// We update the revision's status to Declined here
		Revisions.update({_id: revision._id}, {$set: {status: "Open", descicionByUsername: Meteor.user().username, descionByUserId: Meteor.user()._id}});

	}

});