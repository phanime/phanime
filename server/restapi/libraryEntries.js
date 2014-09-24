//////////////////////////////////
/////////// Get ALL //////////////
//////////////////////////////////

// maps to: /api/v1/resource

RESTstop.add('libraryEntries', { require_login: true, method: 'GET' }, function() {

	// Grab all of user's library entries

	return {libraryEntries: LibraryEntries.find({ userId: this.user._id }).fetch()};

});

//////////////////////////////////////////////
////////////// GET specific by ID ////////////
//////////////////////////////////////////////

// maps to: /api/v1/resource/:id

RESTstop.add('libraryEntries/:_id', { require_login: true, method: 'GET' }, function() {

	// Grab a specific entry from user's library

	return {libraryEntry: LibraryEntries.findOne({_id: this.params._id, userId: this.user._id })};

});


//////////////////////////////////////////////
////////////// PUT specific by ID ////////////
//////////////////////////////////////////////

// maps to: /api/v1/resource/:id

RESTstop.add('libraryEntries/:_id', { require_login: true, method: 'PUT' }, function() {

	// Update a specific library entry for user

	var updatedLibraryEntry = this.request.body;
	console.log(updatedLibraryEntry);

	LibraryEntries.update({_id: this.params._id, userId: this.user._id}, {$set: updatedLibraryEntry});


	return {libraryEntry: LibraryEntries.findOne({_id: this.params._id, userId: this.user._id })};

});