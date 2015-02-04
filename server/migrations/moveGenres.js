Migrations.add({
	version: 1,
	up: function() {
		var genres = Genres.find().fetch();
		genres = _.pluck(genres, 'name');
		Anime.find({}).forEach(function(anime) {

		}); 
	}
});