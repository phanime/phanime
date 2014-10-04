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

		console.log(template.data);

		// Approving the revision basically means we'll be adding the updated data to our database

		// We'll also update the revision's status to Approved here

	},

	'click .declineRevision' : function(event, template) {


		console.log(template.data);

		var revision = template.data;


		// We update the revision's status to Declined here
		Revisions.update({_id: revision._id}, {$set: {status: "Declined"}});



	}

});