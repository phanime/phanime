Template.userLibrary.created = function() {

	this.statusFilter = new ReactiveVar('Watching');
	this.libraryView = new ReactiveVar('List');

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

Template.userLibrary.helpers({
	selectedStatusFilter: function() {
		return Template.instance().statusFilter.get();
	},
	selectedLibraryView: function() {
		return Template.instance().libraryView.get();
	},
	activeLibraryView: function(libraryView) {
		var template = Template.instance();
		var currentLibraryView = template.libraryView.get();

		if (currentLibraryView === libraryView) {
			return 'active';
		} else {
			return '';
		}	
	},

	coverViewDisabled: function() {
		var template = Template.instance();
		var entries = template.data.libraryEntries;

		// If we have more than 100 entries, then we shouldn't allow to switch to cover
		if (entries.length > 100) {
			return 'disabled';
		} else {
			return '';
		}
	},

	libraryViewCheck: function(libraryView) {
		var template = Template.instance();
		var currentLibraryView = template.libraryView.get();

		return currentLibraryView === libraryView;

	},


	activeStatusFilter: function(status) {
		var template = Template.instance();
		var statusFilter = template.statusFilter.get();

		if (statusFilter === status) {
			return 'active';
		} else {
			return '';
		}
	},

	statusFilterCheck: function(status) {
		var template = Template.instance();
		var statusFilter = template.statusFilter.get();

		if (statusFilter === 'All') {
			return true;
		}

		return statusFilter === status;
	},

	recentlyAdded: function(template) {
		if (this) {
			return {
				entries: LibraryEntries.find({userId: this._id}, {sort: {createdAt: -1}, limit: 6})
			};
		}
	},

	watching: function(template) {
		if (this) {
			return {
				entries: LibraryEntries.find({userId: this._id, status: 'Watching'}),
				count: LibraryEntries.find({userId: this._id, status: 'Watching'}).count()
			};
		}
	},

	completed: function() {
		if (this) {
			return {
				entries: LibraryEntries.find({userId: this._id, status: 'Completed'}),
				count: LibraryEntries.find({userId: this._id, status: 'Completed'}).count()
			};
		}	
	},

	planToWatch: function() {
		if (this) {
			return {
				entries: LibraryEntries.find({userId: this._id, status: 'Plan to watch'}),
				count: LibraryEntries.find({userId: this._id, status: 'Plan to watch'}).count()
			};
		}
	},

	onHold: function() {
		if (this) {
			return {
				entries: LibraryEntries.find({userId: this._id, status: 'On hold'}),
				count: LibraryEntries.find({userId: this._id, status: 'On hold'}).count()
			};
		}	
	},

	dropped: function() {
		if (this) {
			return {
				entries: LibraryEntries.find({userId: this._id, status: 'Dropped'}),
				count: LibraryEntries.find({userId: this._id, status: 'Dropped'}).count()
			};
		}
	}
});