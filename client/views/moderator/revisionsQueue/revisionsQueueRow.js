Template.revisionsQueueRow.created = function() {
	this.isExpanded = new ReactiveVar(false);
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

	},

	'click .declineRevision' : function(event, template) {

		var revision = template.data;

		Meteor.call('revisionDeclined', revision, function(error, result) {

			if (error) {
				Notifications.error('Revision couldn\'t be declined', error.reason);
			} else {
				Notifications.success('Revision declined', 'Revision was successfully declined, you can make changes to it.');
			}


		});

		// Meteor.call('uploadImageFromUrl', revision.content.coverImage, 'anime', 'cover', 'somerandomID', function(error, result) {

		// 	console.log(error);
		// 	console.log(result);

		// });

	},
	'click .reopenRevision' : function(event, template) {

		var revision = template.data;

		Meteor.call('revisionReopen', revision, function(error, result) {

			if (error) {
				Notifications.error('Revision couldn\'t be re-opened', error.reason);
			} else {
				Notifications.success('Revision re-opened', 'Revision was successfully re-opened, you can make changes to it.');
			}


		});
	}

});

Template.revisionsQueueRow.helpers({
	isExpanded: function() {
		return Template.instance().isExpanded.get();
	},
	approveButton: function() {

		var template = Template.instance();
		var revision = template.data;

		if (revision.status === "Open" || revision.status === "Declined") {
			return true;
		} else {
			return false;
		}
	},
	declineButton: function() {

		var template = Template.instance();
		var revision = template.data;

		if (revision.status === "Open") {
			return true;
		} else {
			return false;
		}

	},
	reopenButton: function() {
		var template = Template.instance();
		var revision = template.data;

		if (revision.status === "Declined") {
			return true;
		} else {
			return false;
		}
	},
	revisionUpdateFormType: function(contentType, type) {
		var template = Template.instance();
		var revision = template.data;

		return revision.type === type && revision.contentType === contentType;
	}
});