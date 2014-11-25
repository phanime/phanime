Accounts.emailTemplates.siteName = "phanime";
Accounts.emailTemplates.from = "no-reply <no-reply@phanime.com>";
Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "How to reset your password on phanime";
};
Accounts.emailTemplates.resetPassword.html = function (user, url) {
	var message = '<div style="font: Myriad Pro, sans-serif;">'; 
	message += '<h1>phanime</h1><br>';
	message += "<div>Hello " + user.originalUsername + ",</div><br>"
	message += "<div>To reset your password, simply click the link below.</div>"
	message += "<h3><a href=" + url + ">reset password</h3>";
	message += "<div>If you've received this email in error or didn't request a password reset, you can simply ignore it.</div>";
	message += "<br><br>";
	message += "<div>Sincerely,</div>";
	message += "<div>The Phanime Team</div>";
	message += "</div>";

	return message;
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