Template.userLibrary.recentlyAdded = function(template) {

	if (this) {
		return LibraryEntries.find({userId: this._id}, {sort: {createdAt: -1}, limit: 6});
	}

};


Template.userLibrary.watching = function(template) {

	if (this) {
		return LibraryEntries.find({userId: this._id, status: 'Watching'});
	}

};

Template.userLibrary.completed = function() {
	if (this) {
		return LibraryEntries.find({userId: this._id, status: 'Completed'});
	}	
};

Template.userLibrary.planToWatch = function() {
	if (this) {
		return LibraryEntries.find({userId: this._id, status: 'Plan to watch'});
	}
};

Template.userLibrary.onHold = function() {
	if (this) {
		return LibraryEntries.find({userId: this._id, status: 'On hold'});
	}	
};

Template.userLibrary.dropped = function() {
	if (this) {
		return LibraryEntries.find({userId: this._id, status: 'Dropped'});
	}
};