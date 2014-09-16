Meteor.methods({
	createAlert: function(event, properties, userIdToAlert) {
		// This will insert the alert into the database
		
		var alert = {
			event: event,
			userId: userIdToAlert,
			properties: properties, // Any details that defines this alert
			read: false,
			createdAt: new Date()
		};

		Alerts.insert(alert, function(error, result) {
			console.log(error);
			console.log(result);
		});

	},
	markAllAlertsRead: function(userId) {
		Alerts.update({userId: userId}, {$set: {read: true}}, {multi: true});
	}
});