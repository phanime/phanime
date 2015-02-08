Meteor.methods({
	phanimeAlerts__createAlert : function(event, properties, userIdToAlert) {
		// We don't want to block other methods
		this.unblock();

		var alert = {
			event: event,
			properties: properties, // Any details that defines this alert
		};

		var alerts = [];

		// check it userIdToAlert is an array, in which case it could be multiple 
		// ids, and we'll assume they'll use the same properties and event
		if (userIdToAlert.constructor !== Array) {
			userIdToAlert = [userIdToAlert];
		}

		_.each(userIdToAlert, function(userId) {
			alert.userId = userId;
			Alerts.insert(alert, function(error, result) {
				if (error) {
					console.log(error);
					throw new Meteor.Error(403, error.reason);
				}
			});
		});

	},
	phanimeAlerts__alertUsernames: function(event, properties, usernames) {
		// We don't want to block other methods
		this.unblock();

		// This method takes the usernames and gets their respective userIds
		var userIds;
		if (usernames.constructor === Array) {
			userIds = _.pluck(Meteor.users.find({username: {$in: usernames}}).fetch(), '_id');
			console.log(userIds);
		}

		Meteor.call('phanimeAlerts__createAlert', event, properties, userIds, function(error, result) {
			if (error) {
				throw new Meteor.Error(403, error.reason);
			}
		});
	},
	phanimeAlerts__markAllAlertsRead: function(userId) {
		Alerts.update({userId: userId}, {$set: {read: true}}, {multi: true});
	}
})