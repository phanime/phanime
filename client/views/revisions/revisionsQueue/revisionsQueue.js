Template.revisionsQueue.created = function() {

	var self = this;

	self.loaded = new ReactiveVar(0);
	self.limit = new ReactiveVar(20);
	self.ready = new ReactiveVar(false);


	// These reactiveVars determine the data we want and in which order
	self.statusFilter = new ReactiveVar("Open");
	self.contentFilter = new ReactiveVar("All");

	self.revisions = new ReactiveVar({});

	self.autorun(function() {
		var limit = self.limit.get();
		var statusFilter = self.statusFilter.get();

		var subscription = Meteor.subscribe("revisionsQueue", statusFilter, limit);

		// We wait until we've got the subscription to be ready
		if (subscription.ready()) {
			self.loaded.set(limit);
			self.ready.set(true);
		} else {
			self.ready.set(false);
		}
	});
};


Template.revisionsQueue.events({

	'click #loadMore' : function(event, template) {
		var increment = 20;

		template.limit.set(template.limit.get() + increment);
	},

	'click .contentFilter > button' : function(event, template) {
		template.contentFilter.set($(event.target).text());
	},

	'click .statusFilter > button' : function(event, template) {
		template.statusFilter.set($(event.target).text());
	}
});


Template.revisionsQueue.helpers({

	isReady: function() {
		return Template.instance().ready.get();
	},

	hasMoreRevisions: function() {
		var template = Template.instance();
		var currentContentFilter = template.contentFilter.get();
		var currentStatusFilter = template.statusFilter.get();

		var filter = {
			contentType: currentContentFilter,
			status: currentStatusFilter
		};

		// We don't want to filter if it's all
		if (filter.contentType === "All")
			delete filter.contentType;

		if (filter.status === "All")
			delete filter.status;


		var revisionsCount = Revisions.find(filter, {sort: {createdAt: -1}}).count();
		return revisionsCount >= template.limit.get();
	},

	currentContentFilter: function(content) {

		var template = Template.instance();
		var currentContentFilter = template.contentFilter.get();

		return content === currentContentFilter ? 'active' : '';

	},
	currentStatusFilter: function(status) {

		var template = Template.instance();
		var currentStatusFilter = template.statusFilter.get();

		return status === currentStatusFilter ? 'active' : '';

	},
	revisions: function() {

		var template = Template.instance();
		var currentContentFilter = template.contentFilter.get();
		var currentStatusFilter = template.statusFilter.get();

		var filter = {
			contentType: currentContentFilter,
			status: currentStatusFilter
		};

		// We don't want to filter if it's all
		if (filter.contentType === "All")
			delete filter.contentType;

		if (filter.status === "All")
			delete filter.status;


		var revisions = Revisions.find(filter, {sort: {createdAt: -1}}).fetch();


		revisions.forEach(function(revision) {
			return revision.content.revisionId = revision._id;
		});

		return revisions;

	}
});
