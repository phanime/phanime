StaffMembers = new Meteor.Collection("staffMembers");


StaffMembersSchema = new SimpleSchema({

	staffPosition: {
		type: String,
		// This should actually be a restricted value (A select type probably)
	},
	animeId: {
		type: String,
		label: "Anime",
		autoform: {
			firstOption: "Select an Anime"
		}
	},
	personId: {
		type: String,
		label: "Person",
		autoform: {
			firstOption: "Select a Person"
		}
	},
	createdAt: {
		type: Date,
		autoform: {
			disabled: true,
			value: new Date(),
		},
		optional: true,
	}

});