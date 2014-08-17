// Publish multiple people

Meteor.publish('people', function() {
	return People.find();
});

