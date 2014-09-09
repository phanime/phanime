Template.userLibrary.recentlyAdded = function(template) {
	if (this) {
		return {
			entries: LibraryEntries.find({userId: this._id}, {sort: {createdAt: -1}, limit: 6})
		};
	}
};

Template.userLibrary.watching = function(template) {
	if (this) {
		return {
			entries: LibraryEntries.find({userId: this._id, status: 'Watching'}),
			count: LibraryEntries.find({userId: this._id, status: 'Watching'}).count()
		};
	}
};

Template.userLibrary.completed = function() {
	if (this) {
		return {
			entries: LibraryEntries.find({userId: this._id, status: 'Completed'}),
			count: LibraryEntries.find({userId: this._id, status: 'Completed'}).count()
		};
	}	
};

Template.userLibrary.planToWatch = function() {
	if (this) {
		return {
			entries: LibraryEntries.find({userId: this._id, status: 'Plan to watch'}),
			count: LibraryEntries.find({userId: this._id, status: 'Plan to watch'}).count()
		};
	}
};

Template.userLibrary.onHold = function() {
	if (this) {
		return {
			entries: LibraryEntries.find({userId: this._id, status: 'On hold'}),
			count: LibraryEntries.find({userId: this._id, status: 'On hold'}).count()
		};
	}	
};

Template.userLibrary.dropped = function() {
	if (this) {
		return {
			entries: LibraryEntries.find({userId: this._id, status: 'Dropped'}),
			count: LibraryEntries.find({userId: this._id, status: 'Dropped'}).count()
		};
	}
};


Template.userLibrary.events({

	'click .statusFilter > button' : function(event, template) {
		var status = $(event.target).text();
		console.log(status);
	}

});