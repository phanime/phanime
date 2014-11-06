Template.body.rendered = function() {


	// We only want this for logged in users
	// We will set the searchingGlobal session
	// variable to true if we encounter "`" and
	// set it to false if we encounter an "ESC"
	// only if the user is logged in (for now)

	$('body').on('keydown', function(event) {

		if (Meteor.user() || Meteor.loggingIn()) {
			// `
			if (event.which === 192)
				Session.set('isSearchingGlobal', true);


			// ESC
			if (event.which === 27)
				Session.set('isSearchingGlobal', false);
		}


	});


};