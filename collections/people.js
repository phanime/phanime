People = new Meteor.Collection("people");

People.helpers({

	coverImageUrl: function() {
		if (this.coverImage) {
			return "http://cdn.phanime.com/images/people/cover/" + this.coverImage;
		} else {
			return "http://cdn.phanime.com/images/site/na.gif";
		}		
	},
	fullName: function() {
		return this.firstName + " " + this.lastName;
	},
	fullNameSlug: function() {
		return this.firstName.toLowerCase() + ((this.lastName) ? "-" + this.lastName.toLowerCase() : '');
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
		autoform: {
			firstOption: "Select Gender"
		},
		optional: true
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
		autoform: {
			firstOption: "Select Blood Type"
		},
		optional: true,
	},
	otherInfo: {
		type: String,
		label: "Other Info",
		autoform: {
			rows: 10
		},
		optional: true,
	}


});