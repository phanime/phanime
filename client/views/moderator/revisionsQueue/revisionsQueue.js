Template.revisionsQueue.created = function() {

	this.currentContentFilter = new ReactiveVar('All');
	this.currentStatusFilter = new ReactiveVar('All');
};


Template.revisionsQueue.contentFilter = function(content) {

	var template = Template.instance();
	var currentContentFilter = template.currentContentFilter.get();

	return content === currentContentFilter ? 'active' : '';
	
};

Template.revisionsQueue.statusFilter = function(status) {

	var template = Template.instance();
	var currentStatusFilter = template.currentStatusFilter.get();

	return status === currentStatusFilter ? 'active' : '';
	
};


Template.revisionsQueue.revisions = function() {

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


	return Revisions.find(filter, {sort: {createdAt: -1}});

};





Template.revisionsQueue.events({

	'click .contentFilter > button' : function(event, template) {
		template.currentContentFilter.set($(event.target).text());
	},
	'click .statusFilter > button' : function(event, template) {
		template.currentStatusFilter.set($(event.target).text());
	}

});