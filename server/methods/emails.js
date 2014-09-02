Meteor.methods({
	
	requestInviteEmail: function(email, username) {

		// Extremely awkward way to generate the message atm
		var message = '<h1>Discover Anime like Never Before</h1><br>';
		message += "We've created a closed beta account for you that you can use by visiting <a href='http://alpha.phanime.com/sign-in'>sign-in</a> page.";
		message += "Username: " + username;
		message += "<div>Sincerely,</div>";
		message += "<div>The Phanime Team</div>";

		// We don't really need the username

		Email.send({
			to: email,
			from: 'no-reply@phanime.com',
			subject: 'You\'ve been invited to Phanime\'s clsoed beta!',
			html: message,
		});

	}

});