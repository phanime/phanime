// Publish library entries for user

Meteor.publish('userLibrary', function(userId) {
	return LibraryEntries.find({userId: userId});
});

