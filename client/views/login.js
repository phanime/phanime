Template.login.events({
	'click button': function(event) {
		event.preventDefault();
		// Get input

		var identification = $('#identification').val();
		var password = $('#password').val();


		Meteor.loginWithPassword(identification, password, function(error) {
			console.log(error);
			var currentRouteName = Router.current().route.name;

			if (error) {
				Notifications.error('Login Unsuccessful', 'Username or password is invalid');
			} else {
				// Redirect the user to index page if login successful only if they are on the login route
				if (currentRouteName === "login") {
					Router.go('index');
				}

			}

		});

	}
});
