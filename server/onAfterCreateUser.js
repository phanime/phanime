// This observe works much like an onAfterCreateUser (something that is not available in meteor at the moemnt)
// We only use this to send a verification email when a new user is added to the following query we run.

Meteor.users.find({"emails.0.verified": false}, {fields: {_id: 1}, limit: 1, sort:{createdAt: -1}}).observe({
	added: function(user) {
		Accounts.sendVerificationEmail(user._id);
	}
});