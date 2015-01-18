Template.revisionsQueue.created = function() {

	this.currentContentFilter = new ReactiveVar('All');
	this.currentStatusFilter = new ReactiveVar('Open');
};


Template.revisionsQueue.events({

	'click .contentFilter > button' : function(event, template) {
		template.currentContentFilter.set($(event.target).text());
	},
	'click .statusFilter > button' : function(event, template) {
		template.currentStatusFilter.set($(event.target).text());
	},

	'click .import-trigger' : function(event, template) {
		console.log('Triggered');
		
		Meteor.call('updateAnimeWithMALId', function(error, result) {
			console.log(error);
			console.log(result);
		});
	}

});


Template.revisionsQueue.helpers({
	contentFilter: function(content) {

		var template = Template.instance();
		var currentContentFilter = template.currentContentFilter.get();

		return content === currentContentFilter ? 'active' : '';
		
	},
	statusFilter: function(status) {

		var template = Template.instance();
		var currentStatusFilter = template.currentStatusFilter.get();

		return status === currentStatusFilter ? 'active' : '';
		
	},
	revisions: function() {

		var template = Template.instance();
		var currentContentFilter = template.currentContentFilter.get();	
		var currentStatusFilter = template.currentStatusFilter.get();

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
