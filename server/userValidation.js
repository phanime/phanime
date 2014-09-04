Accounts.validateNewUser(function(user) {

	var isGood = false;
	console.log(user);

	// Check user name
	if (user.username && user.username.length >= 3 && user.username.length <= 30) {
		isGood = true;
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
		console.log(user.email);
		throw new Meteor.Error(403, "Please provide a valid email address");
	}

	if (isGood === true) {
		return true;
	}


});