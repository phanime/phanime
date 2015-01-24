Episodes = new Meteor.Collection("episodes");

EpisodesSchema = new SimpleSchema({
	animeId: {
		type: String,
		custom: function() {
			// Check that an anime from this ID actually exists
			if (!Anime.findOne({_id: this.value})) {
				return "No anime found with this animeId";
			}
		},
		denyUpdate: true
	},
	episodeNumber: {
		type: Number,
		min: 0,
		max: 5000 // More of a sanity check
	},
	episodeTitle: {
		type: String,
		optional: true
	},
	airDate: {
		type: Date,
		optional: true
	}
	episodeVersion: {
		type: [String],
		allowedValues: [
			"Subbed",
			"Dubbed"
		]
	},
	spoiler: {
		type: Boolean,
		defaultValue: false
	},

	description: {
		type: String,
		optional: true
	}


});

Episodes.attachSchema(EpisodesSchema);
