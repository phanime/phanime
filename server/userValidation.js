Accounts.validateNewUser(function(user) {

	var isGood = false;


	var usernameRegex = /^[a-zA-Z0-9_]+$/;

	// Check user name
	if (user.username && user.username.length >= 3 && user.username.length <= 20) {
		// Check that username doesn't have any spaces
		if (usernameRegex.test(user.username)) {
			isGood = true;
		} else {
			throw new Meteor.Error(403, "Username can only contain alphanumeric characters and underscores");
		}

		// Meteor already does this check, but we might as well do it before to make it easy for the user 
		// to correct the username 
		if (!Meteor.users.findOne({username: user.username.toLowerCase()})) {
			isGood = true;
		} else {
			throw new Meteor.Error(403, "Username already exists");
		}
		
	} else {
		isGood = false;
		throw new Meteor.Error(403, "Username must be between 3 and 30 characters in length");
	}

	// Check email
	var emailRegex = /\S+@\S+\.\S+/;

	if (user.emails && user.emails[0].address && emailRegex.test(user.emails[0].address)) {
		isGood = true;
	} else {
		isGood = false;
		throw new Meteor.Error(403, "Please provide a valid email address");
	}


	////// We no longer do any signup code checks since the app is no longer in closed beta


	// Check signup code
	// var requestedInvite = RequestedInvites.findOne({_id: user.profile.signUpCode, used: false});

	// if (!requestedInvite) {
	// 	// So we either couldn't find a code, or it's already used in which case 
	// 	throw new Meteor.Error(403, 'Sign Up Code is invalid or already in use! Please request one on the front page or provide a valid Sign Up Code.');
	// 	isGood = false;
	// } else {
	// 	isGood = true;
	// }


	return isGood;
	
	// if (isGood === true) {

	// 	// Seems like all validation checked out, so we're about to create the account
	// 	// we should set the signUpCode to used
	// 	// RequestedInvites.update({_id: user.profile.signUpCode}, {$set: {used: true}});

	// 	return true;

	// }


});