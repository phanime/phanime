Template.login.events({
	'click button': function(event) {
		event.preventDefault();
		// Get input

		var identification = $('#identification').val();
		var password = $('#password').val();


		Meteor.loginWithPassword(identification, password, function(error) {
			console.log(error);
		});

	}
});
