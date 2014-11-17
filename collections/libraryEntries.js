LibraryEntriesSchema = new SimpleSchema({
	userId: {
		type: String,
		custom: function() {
			// Check that a user from this ID actually exists
			if (!Meteor.users.findOne({_id: this.value})) {
				return "No user found with this userId";
			}
		},
		denyUpdate: true,
		optional: false
	},
	animeId: {
		type: String,
		custom: function() {
			// Check that an anime from this ID actually exists
			if (!Anime.findOne({_id: this.value})) {
				return "No anime found with this animeId";
			}
		},
		denyUpdate: true,
		optional: false
	},
	type: {
		type: String,
		allowedValues: ['anime', 'manga'],
		optional: false
	},
	status: {
		type: String,
		allowedValues: ['Watching', 'Completed', 'Plan to watch', 'On hold', 'Dropped'],
		optional: false
	},
	comments: {
		type: String,
		min: 1,
		max: 140,
		optional: true
	},
	rating: {
		type: Number,
		decimal: false,
		min: 1,
		max: 10,
		optional: true
	},
	episodesSeen: {
		type: Number,
		decimal: false,
		min: 1,
		optional: true,
		custom: function() {
			// this is how we're defining the max value
			// We'll need to do this in a roundabout way for now
			// since we can't get a field's value if it wasn't updated
			// together with episodesSeen

			console.log(this);

			// check if the object being validated even has 
			// episodesSeen set
			if (!this.isSet) {
				// it's not set, we shouldn't return any errors
				// this field is optional
				return true;
			}

			if (this.isUpdate) {
				var libraryEntry = LibraryEntries.findOne({_id: this.docId});
				var anime = Anime.findOne({_id: libraryEntry.animeId});
			} else {
				var anime = Anime.findOne({_id: this.field("animeId").value});
			}

			if (anime && anime.totalEpisodes && anime.totalEpisodes > 1) {
				
				if (this.value <= anime.totalEpisodes)
					return true;
				else 
					return "Episodes seen value exceeds total episodes";
			} else {
				// if we can't find the total episodes of the anime 
				// we'll just return true for verification 
				return true;
			}
		},
	},
	favourite: {
		type: Boolean,
		optional: true
	},
	privacy: {
		type: Boolean,
		optional: true
	},
	highPriority: {
		type: Boolean,
		optional: true
	},
	rewatching: {
		type: Boolean,
		optional: true
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			}
		},
		denyUpdate: true
	},
	updatedAt: {
		type: Date,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true
	}
});


LibraryEntries = new Meteor.Collection("libraryEntries");

LibraryEntries.attachSchema(LibraryEntriesSchema);

LibraryEntries.helpers({
	anime: function() {
		return Anime.findOne({_id: this.animeId});
	}
});

LibraryEntries.generalHelpers = {
	uniqueEntry: function(libraryEntry) {
		if (LibraryEntries.findOne({userId: libraryEntry.userId, animeId: libraryEntry.animeId})) {
			return false;
		} else {
			return true;
		}
	}
};


LibraryEntries.allow({

	insert: function(userId, libraryEntry) {
		// the user must be logged in, and the library entry must be created by the user
		// Additionally the library entry must pass validation
		// We'll do a unique check in insert function as well
		return LibraryEntries.generalHelpers.uniqueEntry(libraryEntry) && (userId && libraryEntry.userId === userId);
	},
	update: function(userId, libraryEntry, fields, modifier) {

		// can only change your own library entries


		return (libraryEntry.userId === userId);

	},
	remove: function(userId, doc) {

		// can only remove entries that you own
		return doc.userId === userId;

	}
});