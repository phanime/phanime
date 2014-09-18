Template.userLibrary.created = function() {

	this.statusFilter = new ReactiveVar('All');
	this.libraryView = new ReactiveVar('Cover');

};


Template.userLibrary.activeLibraryView = function(libraryView) {
	var template = Template.instance();
	var currentLibraryView = template.libraryView.get();

	if (currentLibraryView === libraryView) {
		return 'active';
	} else {
		return '';
	}	
};

Template.userLibrary.libraryViewCheck = function(libraryView) {
	var template = Template.instance();
	var currentLibraryView = template.libraryView.get();

	return currentLibraryView === libraryView;

};


Template.userLibrary.activeStatusFilter = function(status) {
	var template = Template.instance();
	var statusFilter = template.statusFilter.get();

	if (statusFilter === status) {
		return 'active';
	} else {
		return '';
	}
};

Template.userLibrary.statusFilterCheck = function(status) {
	var template = Template.instance();
	var statusFilter = template.statusFilter.get();

	if (statusFilter === 'All') {
		return true;
	}

	return statusFilter === status;
};

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
		
		template.statusFilter.set(status);
	},

	'click .libraryView > button' : function(event, template) {
		var libraryView = $(event.target).text();

		template.libraryView.set(libraryView);
	}

});