Template.signIn.events({
	'click button': function(event, template) {
		event.preventDefault();
		// Get input

		var identification = $('#identification').val();
		var password = $('#password').val();


		// Get template data
		var data = template.data;

		// Check if the login request is coming from discourse or not 
		Meteor.loginWithPassword(identification, password, function(error) {
			console.log(error);
			var currentRouteName = Router.current().route.name;

			if (error) {
				Notifications.error('Login Unsuccessful', 'Username or password is invalid');
				Router.go('signIn');
			} else {
				// Check if the login request is coming from discourse or not
				if (data.sso && data.sig) {

					console.log(Meteor.user());
					// Temporary way to send the user to the right place after verification
					Meteor.call('discourseSSO', data.sso, data.sig, Meteor.user(), function (error, result) {
						if (result)
							window.location = result;
					});

				} else {
					// Redirect the user to index page if login successful 
					Router.go('index');
				}

			}

		});

	}
});
