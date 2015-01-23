Meteor.methods({
	createAlert: function(event, properties, userIdToAlert) {
		// This will insert the alert into the database
		
		var alert = {
			event: event,
			userId: userIdToAlert,
			properties: properties, // Any details that defines this alert
		};

		Alerts.insert(alert, function(error, result) {
			if (error)
				throw new Meteor.Error(403, error.reason);
		});

	},
	markAllAlertsRead: function(userId) {
		Alerts.update({userId: userId}, {$set: {read: true}}, {multi: true});
	}
});