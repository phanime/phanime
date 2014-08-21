Characters = new Meteor.Collection("characters", {
	transform: function(doc) {

		if (doc.coverImage) {
			doc.coverImageUrl = "http://cdn.phanime.com/images/characters/cover/" + doc.coverImage;
		} else {
			doc.coverImageUrl = 'na.gif';
		}

		doc.fullName = doc.firstName + " " + doc.lastName;
		doc.fullNameSlug = doc.firstName.toLowerCase() + ((doc.lastName) ? "-" + doc.lastName.toLowerCase() : '');

		return doc;
	}
});

CharactersSchema = new SimpleSchema({

	coverImage: {
		type: String,
		label: "Cover Image",
	},
	firstName: {
		type: String,
		label: "First Name"
	},
	lastName: {
		type: String,
		label: "Last Name"
	},
	japaneseName: {
		type: String,
		label: "Japanese Name"
	},
	alternateName: {
		type: String,
		label: "Alternate Name"
	},
	biography: {
		type: String,
		label: "Biography",
		max: 10000
	},
	tags: {
		type: [String],
		label: "Character Tags"
	}


});