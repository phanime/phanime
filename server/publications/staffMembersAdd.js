// StaffMembers add
Meteor.publish("staffMembersAdd", function() {
	return [
		Anime.find(),
		People.find()
	];
});