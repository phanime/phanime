Template.search.created = function() {
	// Hide the scroll bar
	$('body').css('overflow', 'hidden');
};

Template.search.destroyed = function() {
	// Get the scrollbar back
	$('body').css('overflow', '');
}

Template.search.rendered = function() {

	// right when we render the template, we want to 
	// focus the input
	$('input').focus();

};


Template.search.events({

	'click .close-search-handler' : function() {
		Session.set('isSearchingGlobal', false);
	}

	
});


// The actual events that handle showing / hiding the search are found in body.js