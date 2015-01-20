// This is how meteor defines the publish function for publishing current users
// we'll just add additional fields in here
Meteor.publish(null, function() {
	if (this.userId) {
		return Meteor.users.find({_id: this.userId}, {fields: requireCollectionFields.user.defaultFields});
	} else {
		return null;
	}
}, {is_auto: true});