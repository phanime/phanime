Template.animeExplore.helpers({
	animeCount: function() {
		return Anime.find().count();
	}
});