HTTP.methods({
	'api/v1/createUser': {
		get: function(data) {

			Accounts.createUser({
				username: "Lovabelle",
				email: "kitkaym@gmail.com",
				password: "lovabelle"
			});			

			return 'Finished';

		}
	}
});