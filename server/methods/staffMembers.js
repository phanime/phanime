Meteor.methods({
	createStaffMember: function(staffMember) {

		check(staffMember, StaffMembersSchema);

		staffMember.createdAt = new Date();

		StaffMembers.insert(staffMember, function(error, _id) {
			console.log(_id);
		});

	    console.log(staffMember);
	}
});