UI.registerHelper("isUserIdCurrentUser", function(userId) {
	return userId === Meteor.userId();
});


UI.registerHelper('isCurrentUserAFollower', function(followers) {
	if (followers) 
		return followers.indexOf(Meteor.userId()) > -1;
	else 
		return false;
});


UI.registerHelper("getUser", function(userId) {
	return Meteor.users.findOne({_id: userId});
});