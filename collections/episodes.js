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
	},
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
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();
			}
		},
		denyUpdate: true,
		optional: true // this is only made optional because validation before insert will not work if it was required, however, this does not make much of a difference as the createdAt value will still be generated on insert.
	},
	updatedAt: {
		type: Date,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true // this is only made optional because validation before insert will not work if it was required, however, this does not make much of a difference as the value will still be generated on update.
	}
});

Episodes.attachSchema(EpisodesSchema);
