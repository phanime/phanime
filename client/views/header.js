Template.header.events({
	'click #signOut': function(event) {
		Meteor.logout();
		return false;
	}
});