Meteor.publishComposite("customListContentSearch", function(query, type) {

	return {
		find: function() {
			
			switch (type) {
				case "anime":
					return Anime.find({canonicalTitle: new RegExp(query)}, {limit: 20});
				case "characters":
					return Characters.find({$text: {$search: query}}, {limit: 20});
				case "people":
					return People.find({$text: {$search: query}}, {limit: 20});
			}

		}
	};
});