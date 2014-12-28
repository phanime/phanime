Accounts.onCreateUser(function(options, user) {

	// Make the username lowercased and define a new property originalUsername to store the username typed in
	user.originalUsername = user.username;
	user.username = user.username.toLowerCase();

	if (options.profile) {
		user.profile = options.profile;
	}


	// We can probably find a better place to call the "sendVerificationEmail", but this will do for now
	// this is slightly weird, we really need a callback for when the user is created instead of before the 
	// user is created


	// The work around is that we'll wait about 2000 ms before we call the function and hope that the account has been
	// created by then
	Meteor.setTimeout(function() {
			Accounts.sendVerificationEmail(user._id);
	}, 2*1000);

	return user;

});