People = new Meteor.Collection("people", {
	transform: function(doc) {

		if (doc.coverImage) {
			doc.coverImageUrl = "http://cdn.phanime.com/images/people/cover/" + doc.coverImage;
		} else {
			doc.coverImageUrl = 'na.gif';
		}

		doc.fullName = doc.firstName + " " + doc.lastName;
		doc.fullNameSlug = doc.firstName.toLowerCase() + ((doc.lastName) ? "-" + doc.lastName.toLowerCase() : '');

		return doc;
	}
});

PeopleSchema = new SimpleSchema({

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
	givenName: {
		type: String,
		label: "Given Name"
	},
	familyName: {
		type: String,
		label: "Family Name"
	},
	gender: {
		type: String,
		label: "Gender",
	},
	birthDate: {
		type: Date,
		label: "Birthdate"
	},
	website: {
		type: String,
		label: "Website",
	},
	birthPlace: {
		type: String,
		label: "Birth Place"
	},
	bloodType: {
		type: String,
		label: "Blood Type"
	},
	otherInfo: {
		type: String,
		label: "Other Info"
	}


});