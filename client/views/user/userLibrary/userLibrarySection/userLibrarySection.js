Template.userLibrarySection.created = function() {
	var data = Template.currentData();
	var self = this;

	// These reactiveVars needed for infinite scrolling
	self.loaded = new ReactiveVar(0);
	self.limit = new ReactiveVar(18);
	self.ready = new ReactiveVar(false);

	// These reactiveVars determine the data we want and in which order
	self.statusFilter = new ReactiveVar('Watching');
	self.libraryView = new ReactiveVar('List');
	self.sortField = new ReactiveVar('updatedAt');
	self.sortOrder = new ReactiveVar('desc');


	self.autorun(function() {
		var limit = self.limit.get();
		var statusFilter = self.statusFilter.get();
		var sortField = self.sortField.get();
		var sortOrder = self.sortOrder.get();

		var subscription = Meteor.subscribe("userLibrarySection", data.user.username, statusFilter, sortField, sortOrder, limit);

		// We wait until we've got the subscription to be ready
		if (subscription.ready()) {
			self.loaded.set(limit);
			self.ready.set(true);
			console.log('Subscription ready');
		} else {
			self.ready.set(false);
		}

	});

	// Create the sort object
	var sortObj = {};
	sortObj[self.sortField.get()] = (self.sortOrder.get() === 'asc') ? 1 : -1;


	self.libraryEntries = function() {
		return LibraryEntries.find({userId: data.user._id, status: self.statusFilter.get()}, {sort: sortObj, limit: self.loaded.get()});
	}
}

Template.userLibrarySection.rendered = function() {
	var template = Template.instance();
	$(window).scroll(function() {
		if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			// add two rows if in cover mode
			var increment = 12;
			template.limit.set(template.limit.get() + increment);
			console.log("Load more plz?");
		}
	});
}


Template.userLibrarySection.events({

	'click .statusFilter > button' : function(event, template) {
		var status = $(event.target).text();
		
		// Let's check if status is different, if it is, then we need to reset loaded and limit reactiveVars 
		if (status !== template.statusFilter.get()) {
			template.statusFilter.set(status);
		}
	},

	'click .libraryView > button' : function(event, template) {
		var libraryView = $(event.target).text();

		template.libraryView.set(libraryView);
	}
});

Template.userLibrarySection.helpers({

	libraryEntries: function() {
		return Template.instance().libraryEntries();
	},
	isReady: function() {
		return Template.instance().ready.get();
	},
	hasMorelibraryEntries: function() {
		return Template.instance().libraryEntries().count() >= Template.instance().limit.get();
	},


	selectedStatus: function() {
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
		var loaded = template.loaded.get();

		// If we have more than 100 entries, then we shouldn't allow to switch to cover
		if (loaded > 100) {
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
	}

});