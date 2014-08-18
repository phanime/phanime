// Publish single user

Meteor.publish('user', function(username) {
	return Meteor.users.find({username: username});
});

