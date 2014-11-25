Template.forgotPassword.events({
	
	'click button' : function(event, template) {
		var usernameOrEmail = $('#identification').val();
		var emailRegex = /\S+@\S+\.\S+/;
		var usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

		// Check if it's a valid email 
		if (emailRegex.test(usernameOrEmail)) {
			// It's an email and we'll have to ensure that the user actually has this email
			console.log(usernameOrEmail + " is an email.");
			// Let's make sure this user actually has this email

			Accounts.forgotPassword({email: usernameOrEmail}, function(error) {
				if (error) {
					Notifications.error('Failed', error.reason);
				} else {
					Notifications.success('Email sent', "We've sent an email to " + usernameOrEmail + " with further instructions!", {timeout: 8000});
				}
			});

		} else {
			Notifications.error('Failed', "Please provide a valid email");
		}
		// else if (usernameRegex.test(usernameOrEmail)) {
		// 	console.log(usernameOrEmail + " is a username.");
		// } else {
		// 	console.log(usernameOrEmail + " it's neither");
		// }

		// Check if it's a valid username 

		// If both fail then throw an error

	}
});