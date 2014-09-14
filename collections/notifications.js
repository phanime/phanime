// Notifications = new Meteor.Collection('notifications');


// Notifications.allow({
// 	insert: function(userId, doc) {
// 		// We want the notifications to be sent only through
// 		// a meteor method
// 		return false;
// 	}
// });

// createNotification = function(event, properties, userToNotify) {
// 	var notification = {
// 		event: event,
// 		userId: userToNotify,
// 		properties: properties,
// 		read: false
// 	};

// 	return notification;
// };