Meteor.startup(function () {

	// Global Notifications timeout

    _.extend(Notifications.defaultOptions, {
        timeout: 3000
    });

});




Accounts.onResetPasswordLink(function(token, done) {

	Router.go('resetPassword', {token: token});


});


Accounts.onEmailVerificationLink(function(token, done) {
	// Let's call Accounts.verifyEmail to verify that the token is indeed valid
	Accounts.verifyEmail(token, function(error) {
		if (error) {
			// We need to handle this some how?

			Notifications.error("Email verification failed", error.reason);
		} else {
			// No error, we are done
			Notifications.success("Email verified", "Your email address was successfully verified");
			done();
		}
	});
});


Session.set("Mongol", {
	'collections': ['ProfilePosts', 'Anime'],
	'display': true,
	'opacity_normal': ".7",
	'opacity_expand': "1",
});