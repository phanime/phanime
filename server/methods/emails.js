Meteor.methods({
	
	requestInviteEmail: function(email, code) {

		// Extremely awkward way to generate the message atm
		// But it'll do for now.
		var message = '<div style="font: Myriad Pro, sans-serif;">'; 
		message += '<h1>Discover Anime like Never Before</h1><br>';
		message += "<div>You've been invited to Phanime's closed beta.</div>"
		message += "<div>We've attached a unique code to this email that you can use to sign up.</div>"
		message += "<h3>Code: " + code + "</h3>";
		message += "<div>Paste this code into the code field on the <a href='http://phanime.com/sign-up'>sign-up</a> page to create an account and get full access to Phanime's closed beta!</div>";
		message += "<br><br>";
		message += "<div>Sincerely,</div>";
		message += "<div>The Phanime Team</div>";
		message += "</div>";

		Email.send({
			to: email,
			from: 'no-reply@phanime.com',
			subject: 'You\'ve been invited to Phanime\'s clsoed beta!',
			html: message,
		});

	}

});