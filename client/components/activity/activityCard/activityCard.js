Template.activityCard.helpers({
	activityType: function(type) {
		return this.type === type;
	}
});

Template.activityCard.events({

	'click .remove-handle' : function(event, template) {
		var activity = template.data;
		Activity.remove({_id: activity._id});
	}

});