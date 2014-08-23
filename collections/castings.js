Castings = new Meteor.Collection("castings");

CastingsSchema = new SimpleSchema({

	language: {
		type: String,
		allowedValues: [
			"Japanese",
			"English",
			"Korean",
			"Spanish",
			"German",
			"French",
			"Brazilian",
			"Italian",
			"Hungarian",
			"Hebrew"
		],
		autoform: {
			firstOption: "Please select a language"
		}
	},
	role: {
		type: String,
		allowedValues: [
			"Main",
			"Supporting"
		],
		autoform: {
			firstOption: "Select a role"
		}
	},

	animeId: {
		type: String,
		label: "Anime",
		// This is a select type
	},
	personId: {
		type: String,
		label: "Person",
		// This is a select type
	},
	characterId: {
		type: String,
		label: "Character",
		// This is a select type
	}
	createdAt: {
		type: Date,
		autoform: {
			disabled: true,
			value: new Date(),
		}
	}

});