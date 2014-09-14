Alerts = new Meteor.Collection('alerts');

Alerts.allow({
	insert: function(userId, doc) {
		// We want the notifications to be send only through
		// a meteor method
		return false;
	}
});