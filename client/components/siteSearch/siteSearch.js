Template.siteSearch.onCreated(function() {
	// Hide the scroll bar
	$('body').css('overflow', 'hidden');
	$('body').css('height', '100vh');
});

Template.siteSearch.onDestroyed(function() {
	// Get the scrollbar back
	$('body').css('overflow', '');
	$('body').css('height', '');
});

Template.siteSearch.onRendered(function() {

	// right when we render the template, we want to 
	// focus the input
	$('input').focus();

	$('.container.row.search-results').mCustomScrollbar({
		theme: 'dark',
		scrollButtons: {
			enable: true,
			scrollInertia: 0
		}
	});

});


Template.siteSearch.events({

	'click .close-search-handler' : function() {
		Session.set('isSearchingGlobal', false);
	},

	'keyup .site-search__input' : function(event) {
		// ESC = 27
		if (event.which === 27) {
			Session.set('isSearchingGlobal', false);
		}
	}

});


// The actual events that handle showing / hiding the search are found in globalKeyboardShortcuts.js