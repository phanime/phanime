// Publish single user

Meteor.publish('user', function(userId) {
	return Meteor.users.find({_id: userId});
});

