// Publish multiple anime

Meteor.publish('animes', function() {
	return Anime.find();
});

