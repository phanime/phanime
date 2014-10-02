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


Template.body.rendered = function() {

	console.log('rendered body');
	$('body').on('keydown', function(event) {

		// ctrl + `
		if (event.which === 192)
			Session.set('isSearchingGlobal', true);


		// ESC
		if (event.which === 27)
			Session.set('isSearchingGlobal', false);

		console.log(event.which);

	});

};