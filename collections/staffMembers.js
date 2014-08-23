StaffMembers = new Meteor.Collection("staffMembers");


StaffMembersSchema = new SimpleSchema({

	staffPosition: {
		type: String,
		// This should actually be a restricted value (A select type probably)
	},
	animeId: {
		type: String,
		label: "Anime",
		// This is a select type
	},
	personId: {
		type: String,
		label: "Person",
		// This is a select type
	},
	createdAt: {
		type: Date,
		autoform: {
			disabled: true,
			value: new Date(),
		}
	}

});