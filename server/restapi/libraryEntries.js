//////////////////////////////////
/////////// Get ALL //////////////
//////////////////////////////////

// maps to: /api/v1/resource

RESTstop.add('libraryEntries', { require_login: true, method: 'GET' }, function() {

	// Grab all of user's library entries

	var response = {libraryEntries: LibraryEntries.find({ userId: this.user._id }).fetch()};

	return restAPIHelpers.returns.responseJSON(response);

});

//////////////////////////////////////////////
////////////// GET specific by ID ////////////
//////////////////////////////////////////////

// maps to: /api/v1/resource/:id

RESTstop.add('libraryEntries/:_id', { require_login: true, method: 'GET' }, function() {

	// Grab a specific entry from user's library

	var response = {libraryEntry: LibraryEntries.findOne({_id: this.params._id, userId: this.user._id })};

	return restAPIHelpers.returns.responseJSON(response);

});


//////////////////////////////////////////////
////////////// PUT specific by ID ////////////
//////////////////////////////////////////////

// maps to: /api/v1/resource/:id

RESTstop.add('libraryEntries/:_id', { require_login: true, method: 'PUT' }, function() {

	// Update a specific library entry for user

	var updatedLibraryEntry = this.request.body;

	// Ensure data coming in is valid
	if (updatedLibraryEntry.status) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkStatus(updatedLibraryEntry.status)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.episodesSeen) {
	
		// We aren't doing an exhaustive check like figuring out if the episodesSeen lies 
		// in between the total episodes or not.
		// we really should be doing that though.
		if (!restAPIHelpers.allowedValues.checkEpisodesSeen(updatedLibraryEntry.episodesSeen)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.comments) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkComments(updatedLibraryEntry.comments)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.rating) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkRating(updatedLibraryEntry.rating)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.privacy) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkPrivacy(updatedLibraryEntry.privacy)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.highPriority) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkHighPriority(updatedLibraryEntry.highPriority)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (updatedLibraryEntry.rewatching) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkRewatching(updatedLibraryEntry.Rewatching)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	// Ensure object keys are part of the schema and aren't random
	if (restAPIHelpers.schemaCheck.libraryEntries(updatedLibraryEntry)) {

		// We don't want to save the animeId, it can't be changed
		if (updatedLibraryEntry.animeId) {
			delete updatedLibraryEntry.animeId;
		}

		// We don't want to update the userId either, since it can't be changed
		if (updatedLibraryEntry.userId) {
			delete updatedLibraryEntry.userId
		}

		// We don't want to update the createdAt field
		if (updatedLibraryEntry.createdAt) {
			delete updatedLibraryEntry.createdAt;
		}

		// Update the date for when the library entry was updated
		updatedLibraryEntry.updatedAt = new Date();

		LibraryEntries.update({_id: this.params._id, userId: this.user._id}, {$set: updatedLibraryEntry});

		var response = {libraryEntry: LibraryEntries.findOne({_id: this.params._id, userId: this.user._id })};

		return restAPIHelpers.returns.responseJSON(response);


	} else {
		return restAPIHelpers.returns.invalidInput();
	}

});


//////////////////////////////////////////////
//////////////// POST specific ///////////////
//////////////////////////////////////////////

// maps to: /api/v1/resource

RESTstop.add('libraryEntries', { require_login: true, method: 'POST' }, function() {

	// Update a specific library entry for user

	var libraryEntry = this.request.body;



	// Ensure data coming in is valid

	// Required for creation
	if (libraryEntry.animeId) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkAnimeId(libraryEntry.animeId)) {
			return restAPIHelpers.returns.invalidInput();
		}

	} else {
		return restAPIHelpers.returns.invalidInput();
	}

	// Required for creation
	if (libraryEntry.userId !== this.user._id) {
	
		return restAPIHelpers.returns.invalidInput();

	}


	// Required for creation
	if (libraryEntry.status) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkStatus(libraryEntry.status)) {
			return restAPIHelpers.returns.invalidInput();
		}

	} else {
		return restAPIHelpers.returns.invalidInput();
	}


	// Check unique
	// if not unique, than throw error
	if (!restAPIHelpers.allowedValues.checkUniqueEntry(libraryEntry.animeId, this.user._id)) {
		return restAPIHelpers.returns.notUnique();
	}


	if (libraryEntry.episodesSeen) {
	
		// We aren't doing an exhaustive check like figuring out if the episodesSeen lies 
		// in between the total episodes or not.
		// we really should be doing that though.
		if (!restAPIHelpers.allowedValues.checkEpisodesSeen(libraryEntry.episodesSeen)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (libraryEntry.comments) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkComments(libraryEntry.comments)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (libraryEntry.rating) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkRating(libraryEntry.rating)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (libraryEntry.privacy) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkPrivacy(libraryEntry.privacy)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (libraryEntry.highPriority) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkHighPriority(libraryEntry.highPriority)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	if (libraryEntry.rewatching) {
	
		// if we don't pass we should return
		if (!restAPIHelpers.allowedValues.checkRewatching(libraryEntry.Rewatching)) {
			return restAPIHelpers.returns.invalidInput();
		}

	}

	// Ensure object keys are part of the schema and aren't random
	if (restAPIHelpers.schemaCheck.libraryEntries(libraryEntry)) {

		// Add library createdAt date
		libraryEntry.createdAt = new Date();

		// Add library updatedAt date
		libraryEntry.updatedAt = new Date();

		var libraryId = LibraryEntries.insert(libraryEntry);

		var response = {libraryEntry: LibraryEntries.findOne({_id: libraryId, userId: this.user._id })};

		return restAPIHelpers.returns.responseJSON(response);


	} else {
		return restAPIHelpers.returns.invalidInput();
	}

});

//////////////////////////////////////////////////////
//////////////// DELETE specific by ID ///////////////
//////////////////////////////////////////////////////

RESTstop.add('libraryEntries/:_id', { require_login: true, method: 'DELETE' }, function() {


	var removed = LibraryEntries.remove({_id: this.params._id, userId: this.user._id});
	var response;

	if (removed === 0) {

		response = {
				success: false,
				message: 'Library Entry was not removed'
		};
		
	} else {
		response = {
				success: true,
				message: 'Library entry successfully removed'
		};
	}



	return restAPIHelpers.returns.responseJSON(response);

});