Template.accountSecurity.events({
	
	'click button' : function(event, template) {
		var oldPass = $('#oldPassword').val();
		var newPass = $('#newPassword').val();

		Accounts.changePassword(oldPass, newPass, function(error) {
			if (error) {
				Notifications.error('Failed', error.reason);
				console.log(error);
			} else {
				Notifications.success('Password Changed', 'Your password was successfully changed!');
			}
		});
	} 

});