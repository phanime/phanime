Template.revisionsAnimeUpdateForm.created = function() {

	Meteor.call('getGenres', function(error, result) {
		if (!error) {
			Session.set('genres', result);
		}
	});

};

Template.revisionsAnimeUpdateForm.helpers({
	genresOptions: function() {
		var data = Template.instance().data;
		return {
			placeholder: "Select a few genres",
			valueField: "name",
			labelField: "name",
			searchField: "name",
			options: Session.get('genres'),
			onInitialize: function() {
				var currentAnime = data.currentAnime;
				var selectize = this;

				if (currentAnime.genres) {
					currentAnime.genres.forEach(function(genre) {
						selectize.addItem(genre);
					});
				}
			}
		};

	}
});