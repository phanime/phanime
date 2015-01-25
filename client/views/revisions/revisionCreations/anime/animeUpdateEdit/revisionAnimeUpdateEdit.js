Template.revisionAnimeUpdateEdit.created = function() {

	Meteor.call('getGenres', function(error, result) {
		if (!error) {
			Session.set('genres', result);
		}
	});

};

Template.revisionAnimeUpdateEdit.helpers({
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
				currentAnime.genres.forEach(function(genre) {
					selectize.addItem(genre);
				});
			}
		};

	}

});