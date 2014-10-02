Template.body.rendered = function() {


	// We only want this for logged in users

	$('body').on('keydown', function(event) {

		if (Meteor.user() || Meteor.loggingIn()) {
			// ctrl + `
			if (event.which === 192)
				Session.set('isSearchingGlobal', true);


			// ESC
			if (event.which === 27)
				Session.set('isSearchingGlobal', false);
		}


	});


};