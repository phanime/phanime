Template.resetPassword.events({
	
	'click button' : function(event, template) {
		var password = $('#password').val();
		var passwordConfirm = $('#passwordConfirm').val();

		// We should really be doing some sort of password check as well (set some type of standard)

		// here we check that passwords match
		if (password === passwordConfirm) {
			Accounts.resetPassword(template.data.token, password, function(error) {
				if (error) {
					Notifications.error('Reset Password Failed', error.reason);
				} else {
					Notifications.success('Reset Password Success', "Your password has been reset successfully. You've been logged in.");
				}
			});
		} else {
			Notifications.error('Reset Password Failed', "Passwords don't match! Please ensure you've confirmed your password");
		}


	}
});