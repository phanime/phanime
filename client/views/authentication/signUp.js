Template.signUp.events({
	'click button' : function() {
		var username = $('#username').val().trim();
		var email = $('#email').val().trim();
		var password = $('#password').val().trim();
		var code = $('#code').val().trim();


		if (!email || !username || !password || !code) {
			Notifications.error('Registration unsuccessful', 'All fields are requied!');
		}

		// These fields are validated again on the server

		var user = {
			username: username,
			email: email,
			password: password
		}

		Accounts.createUser(user, function(error) {
			
			if (error) {
				Notifications.error("Registration unsuccessful", error.reason);
			} else {
				Router.go('index');
			}


		});

		// Avoid reload / not do normal event stuff
		return false;
	}
});
