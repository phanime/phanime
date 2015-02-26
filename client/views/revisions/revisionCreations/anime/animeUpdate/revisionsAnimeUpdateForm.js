Template.revisionsAnimeUpdateForm.helpers({
	genresOptions: function() {
		var data = Template.instance().data;
		return {
			placeholder: "Select a few genres",
			valueField: "name",
			labelField: "name",
			searchField: "name",
			sortField: "name",
			load: function(query, callback) {
				var selectize = this;
				var currentAnime = data.currentAnime;

				if (!query) {
					// Only make the call if query is empty.. so essentially on initialization
					Meteor.call('getGenres', function(error, result) {
						if (!error) {
							callback(result);
							selectize.addItems(currentAnime.genres);
						}
					});
				}

			},
			preload: true
		};
	},
	themesOptions: function() {
		var data = Template.instance().data;
		return {
			placeholder: "Select a few themes",
			valueField: "name",
			labelField: "name",
			searchField: "name",
			sortField: "name",
			load: function(query, callback) {
				var selectize = this;
				var currentAnime = data.currentAnime;

				if (!query) {
					// Only make the call if query is empty.. so essentially on initialization
					Meteor.call('getThemes', function(error, result) {
						if (!error) {
							callback(result);
							selectize.addItems(currentAnime.themes);
						}
					});
				}

			},
			preload: true
		};
	}
});
