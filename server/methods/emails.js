Meteor.methods({
	
	requestInviteEmail: function(email, code) {

		// Extremely awkward way to generate the message atm
		var message = '<h1>Discover Anime like Never Before</h1><br>';
		message += "You've been invited to Phanime's closed beta."
		message += "We've attached a unique code to this email that you can use to sign up."
		message += "Code: " + code;
		message += "Paste this code into the code field on the <a href='http://alpha.phanime.com/sign-up'>sign-un</a> page to create an account and get full access to Phanime!";
		message += "<div>Sincerely,</div>";
		message += "<div>The Phanime Team</div>";

		Email.send({
			to: email,
			from: 'no-reply@phanime.com',
			subject: 'You\'ve been invited to Phanime\'s clsoed beta!',
			html: message,
		});

	}

});