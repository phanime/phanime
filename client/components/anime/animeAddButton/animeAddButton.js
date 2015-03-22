Template.animeAddButton.created = function() {
	this.isExpanded = new ReactiveVar(false);
};


Template.animeAddButton.rendered = function() {
	$('#animeAddButton').addClass('animated fadeIn');
}


Template.animeAddButton.events({
	
	'mouseenter #animeAddButton' : function(event, template) {
		$(event.target).removeClass('animated rubberBand');
		$(event.target).addClass('animated pulse');
	},

	'mouseleave #animeAddButton' : function(event, template) {
		$(event.target).removeClass('animated pulse');
	},
	'click #animeAddButton' : function(event, template) {
		// We want to show the libraryEntryForm
		template.isExpanded.set(!template.isExpanded.get());
		
	},
	'click #animeFavourite' : function(event, template) {
		// Toggle favourite field for the library entry, if it exists.
		console.log(template.data);
		var anime = template.data;
		var libraryEntry = LibraryEntries.findOne({animeId: anime._id});

		console.log(libraryEntry);

		if (libraryEntry) {
			LibraryEntries.update({_id: libraryEntry._id}, {$set: {favourite: !libraryEntry.favourite}});
		}
	}
});


Template.animeAddButton.helpers({
	isExpanded: function() {
		return Template.instance().isExpanded.get();
	}
});