Template.animeAddButton.created = function() {
	this.isExpanded = new ReactiveVar(false);
};


Template.animeAddButton.rendered = function() {
	$('#animeAddButton').addClass('animated rubberBand');
}


Template.animeAddButton.events({
	
	'mouseenter #animeAddButton' : function(event, template) {
		$(event.target).removeClass('animated rubberBand');
		$(event.target).addClass('animated pulse');
	},

	'mouseleave #animeAddButton' : function(event, template) {
		$(event.target).removeClass('animated pulse');
	},

	// 
	'click #animeAddButton' : function(event, template) {
		// We want to show the libraryEntryForm
		template.isExpanded.set(true);
		$('.libraryEntryForm').addClass('animated fadeInUp')
		
	},

	'click #closeLibraryCard' : function(event, template) {

		template.isExpanded.set(false);
	}

});


Template.animeAddButton.helpers({
	isExpanded: function() {
		return Template.instance().isExpanded.get();
	}
});