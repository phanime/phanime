Alerts = new Meteor.Collection('alerts');

Alerts.allow({
	insert: function(userId, doc) {
		// We want the notifications to be send only through
		// a meteor method
		return false;
	}
});


createAlert = function(event, properties, userToAlert) {
	var alert = {
		event: event,
		userId: userToAlert,
		properties: properties,
		read: false
	};

	return alert;
};