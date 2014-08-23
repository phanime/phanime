// Castings add
Meteor.publish("castingsAdd", function() {
	return [
		Anime.find(),
		People.find(),
		Characters.find()
	];
});