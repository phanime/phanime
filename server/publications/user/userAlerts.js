Meteor.publish('userAlerts', function(userId) {
	// Grab the currently logged in user's alerts
	return Alerts.find({userId: this.userId});
});