UI.registerHelper("isUserIdCurrentUser", function(userId) {
	return userId === Meteor.userId();
});
