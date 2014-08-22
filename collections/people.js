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
		optional: true,
	},
	firstName: {
		type: String,
		label: "First Name"
	},
	lastName: {
		type: String,
		label: "Last Name",
		optional: true,
	},
	givenName: {
		type: String,
		label: "Given Name",
		optional: true,
	},
	familyName: {
		type: String,
		label: "Family Name",
		optional: true,
	},
	gender: {
		type: String,
		label: "Gender",
		allowedValues: ["Male", "Female"],
		optional: true,
		autoform: {
			firstOption: "Select Gender"
		}
	},
	birthDate: {
		type: Date,
		label: "Birthdate",
		optional: true,
	},
	website: {
		type: String,
		label: "Website",
		optional: true,
	},
	birthPlace: {
		type: String,
		label: "Birth Place",
		optional: true,
	},
	bloodType: {
		type: String,
		label: "Blood Type",
		allowedValues: ["A", "B", "AB", "O"],
		optional: true,
		autoform: {
			firstOption: "Select Blood Type"
		}
	},
	otherInfo: {
		type: String,
		label: "Other Info",
		optional: true,
		autoform: {
			rows: 10
		}
	}


});