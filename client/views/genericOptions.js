UI.registerHelper('animeAll', function() {
	return Anime.find().map(function(anime) {
		return {
			label: anime.canonicalTitle,
			value: anime._id
		};
	});
});

UI.registerHelper('peopleAll', function() {
	return People.find().map(function(person) {
		return {
			label: person.fullName(),
			value: person._id
		};
	});
});


UI.registerHelper('charactersAll', function() {
	return Characters.find().map(function(character) {
		return {
			label: character.fullName(),
			value: character._id
		};
	});
});