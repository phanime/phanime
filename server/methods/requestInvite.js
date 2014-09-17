Meteor.methods({
	
	'requestInviteFlow' : function(email) {

		// Ensure the email doesn't already exist
		var requestedInvite = RequestedInvites.findOne({email: email});

		// Email doesn't already exist
		if (!requestedInvite) {

			// Generate a random unique code by inserting a document (_id field)
			var id = RequestedInvites.insert({email: email});

			// Send an email
			Meteor.call('requestInviteEmail', email, id, function(error, result) {

				console.log(error);
				console.log(result);

			});

		} else {
			throw new Meteor.Error(403, "We've already sent you an invite!");
		}


	}

});