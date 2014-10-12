Accounts.onCreateUser(function(options, user) {

	// Make the username lowercased and define a new property originalUsername to store the username typed in
	user.originalUsername = user.username;
	user.username = user.username.toLowerCase();

	if (options.profile) {
		user.profile = options.profile;
	}

	return user;

});