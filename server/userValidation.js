Accounts.validateNewUser(function(user) {

	var isGood = false;
	console.log(user);

	var usernameRegex = /^[a-zA-Z0-9_]+$/;

	// Check user name
	if (user.username && user.username.length >= 3 && user.username.length <= 30) {
		// Check that username doesn't have any spaces 
		if (usernameRegex.test(user.username)) {
			isGood = true;
		} else {
			throw new Meteor.Error(403, "Username can only contain alphanumeric characters and underscores");
		}
		
	} else {
		isGood = false;
		throw new Meteor.Error(403, "Username must be between 3 and 30 characters in length");
	}

	// Check email
	var emailRegex = /\S+@\S+\.\S+/;

	if (user.emails[0].address && emailRegex.test(user.emails[0].address)) {
		isGood = true;
	} else {
		isGood = false;
		throw new Meteor.Error(403, "Please provide a valid email address");
	}

	if (isGood === true) {
		return true;
	}


});