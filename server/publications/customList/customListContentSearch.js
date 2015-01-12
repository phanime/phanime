Meteor.publishComposite("customListContentSearch", function(query, type) {

	return {
		find: function() {
			
			switch (type) {
				case "anime":
					return Anime.find({canonicalTitle: new RegExp(query)});
					break;
				case "characters":
					return Characters.find({$text: {$search: query}});
					break;
				case "people":
					return People.find({$text: {$search: query}});
					break;
				default: 
					break;
			}

		}
	};
});