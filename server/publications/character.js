// Publish a specific character by ID

Meteor.publish('character', function(characterId) {
	return Characters.find({_id: characterId});
});

