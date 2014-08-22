Template.header.events({
	'click #logout': function(event) {
		Meteor.logout();
		return false;
	}
});