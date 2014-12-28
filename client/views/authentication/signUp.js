Template.signUp.events({
	'click #signUpButton' : function() {
		var username = $('#username').val().trim();
		var email = $('#email').val().trim();
		var password = $('#password').val().trim();

		// $('#username').parent().attr('isInvalid', true);
		// $('#username').parent().attr('error', "Username is already in use");


		if (!email || !username || !password) {
			Notifications.error('Registration unsuccessful', 'All fields are requied!');
			return false;
		}

		// These fields are validated properly on the server

		var user = {
			username: username,
			email: email,
			password: password
		}

		Accounts.createUser(user, function(error) {
			
			if (error) {
				Notifications.error("Registration unsuccessful", error.reason);
			} else {
				Router.go('verifyEmail');
			}


		});

		// Avoid reload / not do normal event stuff
		return false;
	}
});
