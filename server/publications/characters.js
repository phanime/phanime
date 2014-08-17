// Publish multiple characters

Meteor.publish('characters', function() {
	return Characters.find();
});

