Template.libraryEntryRow.created = function() {

	this.expanded = new ReactiveVar(false);
		
};


Template.libraryEntryRow.expanded = function() {
	var template = Template.instance();

	return template.expanded.get();
};


Template.libraryEntryRow.events({
	
	'click .library-entry-row' : function (event, template) {

		template.expanded.set(!template.expanded.get());

	}


});