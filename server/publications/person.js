// Publish specific person by ID

Meteor.publish('person', function(personId) {
	return People.find({_id: personId});
});

