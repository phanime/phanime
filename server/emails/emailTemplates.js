Accounts.emailTemplates.siteName = "phanime";
Accounts.emailTemplates.from = "no-reply <no-reply@phanime.com>";


// Reset password
Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "How to reset your password on phanime";
};
Accounts.emailTemplates.resetPassword.html = function (user, url) {
	return Spacebars.toHTML({ url: url }, Assets.getText('emailTemplates/resetPassword.html'));
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
	var message = 'phanime\n\n';
	message += "Hello " + user.originalUserName + ",\n"
	message += "To reset your password, simply click the link below.\n"
	message += url + "\n\n";
	message += "If you've received this email in error or didn't request a password reset, you can simply ignore it.\n\n\n";
	message += "Sincerely,\n";
	message += "The phanime Team";

	return message;
};


// Verification email

Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return "phanime Account Confirmation Required";
};
Accounts.emailTemplates.verifyEmail.html = function (user, url) {
	return Spacebars.toHTML({ url: url }, Assets.getText('emailTemplates/verifyEmail.html'));
};

Accounts.emailTemplates.verifyEmail.text = function (user, url) {
	var message = 'phanime\n\n';
	message += "Hello " + user.originalUserName + ",\n"
	message += "To complete your registraion, verify your email by clicking the link below\n"
	message += url + "\n\n";
	message += "If you've received this email in error or didn't register on phanime, you can simply ignore it.\n\n\n";
	message += "Sincerely,\n";
	message += "The phanime Team";

	return message;
};