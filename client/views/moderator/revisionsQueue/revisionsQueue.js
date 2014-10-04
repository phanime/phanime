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



Template.revisionsQueue.events({

	'click .contentFilter > button' : function(event, template) {
		template.currentContentFilter.set($(event.target).text());
	},
	'click .statusFilter > button' : function(event, template) {
		template.currentStatusFilter.set($(event.target).text());
	}

});