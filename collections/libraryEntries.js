LibraryEntries = new Meteor.Collection("libraryEntries");

LibraryEntries.helpers({
	anime: function() {
		return Anime.findOne({_id: this.animeId});
	}
});



LibraryEntries.verifyLibraryEntry = function(libraryEntry) {

	var verificationCheck = true;

	// Check that required fields exist

	if (libraryEntry.userId && libraryEntry.type && libraryEntry.animeId && libraryEntry.status) {

		// Check required fields against schema as well as any additional fields
		for (var key in libraryEntry) {

			// If we get even one field that doesn't pass the validation
			// we'll set verificationCheck to false and break out of the for .. in loop
			if (LibraryEntries.allowedValuesCHecker[key](libraryEntry) === false) {
				verificationCheck = false;
				break;
			}

		}


		// Lets do a unique check before we create the libraryEntry 
		// we'll set the verificationCheck to false if the entry is not 
		// unique
		if (LibraryEntries.generalHelper.uniqueEntry(libraryEntry) === false) {
			verificationCheck = false;
		}

		return verificationCheck;


	} else {

		// Some of the required fields are missing, the libraryEntry object is not valid!
		return false;
	}


};

LibraryEntries.allowedValuesChecker = {
	animeId: function(libraryEntry) {
		if (Anime.findOne({_id: libraryEntry.animeId})) {
			return true;
		} else {
			return false;
		}
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
		if (anime.totalEpisodes && anime.totalEpisodes > 0) {
			// If anime total episodes exist then check that episodesSeen
			// is an integer value as well as ensure that it's lower than 
			// the total anime episodes value.
			return (libraryEntry.episodesSeen % 1 === 0) && (libraryEntry.episodesSeen >= 1 && libraryEntry.episodesSeen <= anime.totalEpisodes);
		} else {
			// if anime total episodes don't exist 
			// then just check that episodes seen
			// is an integer value and is greater than 1
			return libraryEntry.episodesSeen % 1 === 0 && libraryEntry.episodesSeen >= 1;
		}
	},
	privacy: function(libraryEntry) {
		return libraryEntry.privacy === true || libraryEntry.privacy === false;
	},
	highPriority: function(libraryEntry) {
		return libraryEntry.highPriority === true || libraryEntry.highPriority === false;
	},
	rewatching: function(rewatching) {
		return libraryEntry.rewatching === true || libraryEntry.rewatching === false;
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
		var fields = ['_id', 'userId', 'animeId', 'status', 'comments', 'rating', 'episodesSeen', 'privacy', 'highPriority', 'rewatching', 'updatedAt', 'createdAt'];

		for (var key in libraryEntry) {
			if (fields.indexOf(key) === -1) {
				return false;
			} 
		}

		return true;
	}

};


LibraryEntries.allow({

	insert: function(userId, doc) {
		// the user must be logged in, and the library entry must be created by the user
		return (userId && doc.userId === userId);
	},
	update: function(userId, doc, fields, modifier) {

		// can only change your own library entries
		return doc.userId === userId;

	},
	remove: function(userId, doc) {

		// can only remove entries that you own
		return doc.userId === userId;

	}


});