// Publish single user

Meteor.publish('user', function(username) {
	return Meteor.users.find({username: username});
});

Meteor.publish('userWithLibraryEntries', function(username) {
	var user = Meteor.users.findOne({username: username});

	return [
		Meteor.users.find({username: username}),
		LibraryEntries.find({userId: user._id})
	];
})