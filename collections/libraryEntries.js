LibraryEntries = new Meteor.Collection("libraryEntries");

LibraryEntries.attachSchema(Schemas.LibraryEntries);

var Schemas = {};

Schemas.LibraryEntries = new SimpleSchema({
	userId: {
		type: String,
		custom: function() {
			// Check that a user from this ID actually exists
			if (Meteor.users.findOne({_id: this.value}))) {
				return true;
			} else {
				return "No user found with this userId";
			}
		},
		optional: false
	},
	animeId: {
		type: String,
		custom: function() {
			// Check that an anime from this ID actually exists
			if (Anime.findOne({_id: this.value})) {
				return true;
			} else {
				return "No anime found with this animeId";
			}
		},
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
		max: function() {
			// this is how we're defining the max value
			var anime = Anime.findOne({_id: libraryEntry.animeId});

			if (anime.totalEpisodes && anime.totalEpisodes > 1) {
				return anime.totalEpisodes;
			} else {
				// We just return an arbitrarily large number if we can't find 
				// the total episodes of the anime 
				return 10000;
			}
		},
		optional: true
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

LibraryEntries.helpers({
	anime: function() {
		return Anime.findOne({_id: this.animeId});
	}
});



LibraryEntries.verifyLibraryEntry = function(libraryEntry) {

	var verificationCheck = true;

	// Check that required fields exist
	// console.log(libraryEntry);

	if (libraryEntry.userId && libraryEntry.type && libraryEntry.animeId && libraryEntry.status) {

		// Check required fields against schema as well as any additional fields

		for (var key in libraryEntry) {
			// Only verify the exact object without any
			// inherited properties
			if (libraryEntry.hasOwnProperty(key)) {
				// If we get even one field that doesn't pass the validation
				// we'll set verificationCheck to false and break out of the for .. in loop
				if (LibraryEntries.allowedValuesChecker[key](libraryEntry) === false) {
					console.log(key + " failed verification");
					verificationCheck = false;
					break;
				}
			}
		}

		// console.log(verificationCheck);
		return verificationCheck;


	} else {

		// Some of the required fields are missing, the libraryEntry object is not valid!
		return false;
	}
};

LibraryEntries.buildEntry = function(libraryEntry) {


	if (LibraryEntries.verifyLibraryEntry(libraryEntry) === true) {
		libraryEntry.createdAt = new Date();
		libraryEntry.updatedAt = new Date();
	} else {
		return false;
	}


	return libraryEntry;
}

LibraryEntries.allowedValuesChecker = {
	_id: function(libraryEntry) {
		// Assumption is that this is created by Meteor automatically
		// since we can invoke this helper at any time before the creation
		// of _id by meteor.
		return true;
	},
	userId: function(libraryEntry) {
		// Ensure the userId in the libraryEntry
		// is equal to the userId of the logged in 
		// user
		if (libraryEntry.userId === Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	},
	animeId: function(libraryEntry) {
		if (Anime.findOne({_id: libraryEntry.animeId})) {
			return true;
		} else {
			return false;
		}
	},
	type: function(libraryEntry) {
		return (libraryEntry.type === 'anime' || libraryEntry.type === 'manga'); 
	},
	status: function(libraryEntry) {
		return ['Watching', 'Completed', 'Plan to watch', 'On hold', 'Dropped'].indexOf(libraryEntry.status) > -1;
	},
	comments: function(libraryEntry) {
		return libraryEntry.comments.length <= 140;
	}, 
	rating: function(libraryEntry) {
		// Check that the rating is an integer value 
		// and that it is between 1 and 10 
		return libraryEntry.rating % 1 === 0 && libraryEntry.rating >= 1 && libraryEntry.rating <= 10;
	},
	episodesSeen: function(libraryEntry) {
		var anime = Anime.findOne({_id: libraryEntry.animeId});
		// console.log((libraryEntry.episodesSeen === null) || (libraryEntry.episodesSeen % 1 === 0) && (libraryEntry.episodesSeen >= 1 && libraryEntry.episodesSeen <= anime.totalEpisodes));
		if (anime.totalEpisodes && anime.totalEpisodes > 0) {
			// If anime total episodes exist then check that episodesSeen
			// is an integer value as well as ensure that it's lower than 
			// the total anime episodes value.
			return (libraryEntry.episodesSeen === null) || (libraryEntry.episodesSeen % 1 === 0) && (libraryEntry.episodesSeen >= 1 && libraryEntry.episodesSeen <= anime.totalEpisodes);
		} else {
			// if anime total episodes don't exist 
			// then just check that episodes seen
			// is an integer value and is greater than 1
			return (libraryEntry.episodesSeen === null) || libraryEntry.episodesSeen % 1 === 0 && libraryEntry.episodesSeen >= 1;
		}
	},
	privacy: function(libraryEntry) {
		return libraryEntry.privacy === true || libraryEntry.privacy === false;
	},
	highPriority: function(libraryEntry) {
		return libraryEntry.highPriority === true || libraryEntry.highPriority === false;
	},
	rewatching: function(libraryEntry) {
		return libraryEntry.rewatching === true || libraryEntry.rewatching === false;
	},
	updatedAt: function(libraryEntry) {
		return (libraryEntry.updatedAt !== undefined);
	},
	createdAt: function(libraryEntry) {
		return (libraryEntry.createdAt !== undefined);
	}
};

LibraryEntries.generalHelpers = {
	uniqueEntry: function(libraryEntry) {
		if (LibraryEntries.findOne({userId: libraryEntry.userId, animeId: libraryEntry.animeId})) {
			return false;
		} else {
			return true;
		}
	},
	schemaCheck: function(libraryEntry) {
		var fields = ['_id', 'userId', 'type', 'animeId', 'status', 'comments', 'rating', 'episodesSeen', 'privacy', 'highPriority', 'rewatching', 'updatedAt', 'createdAt'];

		for (var key in libraryEntry) {
			if (fields.indexOf(key) === -1) {
				return false;
			} 
		}

		return true;
	}
};


LibraryEntries.allow({

	insert: function(userId, libraryEntry) {
		// the user must be logged in, and the library entry must be created by the user
		// Additionally the library entry must pass validation
		// We'll do a unique check in insert function as well
		return LibraryEntries.generalHelpers.uniqueEntry(libraryEntry) && (LibraryEntries.verifyLibraryEntry(libraryEntry) && (userId && libraryEntry.userId === userId));
	},
	update: function(userId, libraryEntry, fields, modifier) {

		// can only change your own library entries
		// validate fields to ensure that the libraryEntries
		// still follow the schema

		// temporary solution since the libraryEntry that's being sent in
		// by meteor doesn't seem to have the updated fields set.. so we'll
		// take the updated fields from the modifier and update their values 
		// in the libraryEntry
		for (var key in modifier['$set']) {
			libraryEntry[key] = modifier['$set'][key];
		}

		// For now, if libraryEntries don't have a createdAt field just add it 
		if (!libraryEntry.createdAt)
			libraryEntry.createdAt = new Date();

		// if type doesn't exists add it 
		if (!libraryEntry.type)
			libraryEntry.type = 'anime';


		return (LibraryEntries.verifyLibraryEntry(libraryEntry) && (libraryEntry.userId === userId));

	},
	remove: function(userId, doc) {

		// can only remove entries that you own
		return doc.userId === userId;

	}
});