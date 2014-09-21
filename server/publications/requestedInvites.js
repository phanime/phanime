Meteor.publish('requestedInvites', function() {
	// Mainly used for counts
	return RequestedInvites.find();
});