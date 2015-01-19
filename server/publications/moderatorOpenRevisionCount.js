Meteor.publish('moderatorOpenRevisionCount', function() {
	// Mainly used for counts
	// only publish this if the user is actually a moderator
	var user = Meteor.users.findOne({_id: this.userId});
	if (user && user.isModerator()) {
		Counts.publish(this, 'openRevisions', Revisions.find({status: 'Open'}));
	}
});