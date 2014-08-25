Characters = new Meteor.Collection("characters");


Characters.helpers({
	coverImageUrl: function() {
		if (this.coverImage){
			return "http://cdn.phanime.com/images/characters/cover/" + this.coverImage;
		} else {
			return "http://cdn.phanime.com/images/site/na.gif";
		}
	},
	fullName: function() {
		if (this.lastName) {
			return this.firstName + " " + this.lastName;
		} else {
			return this.firstName;
		}
	},
	fullNameSlug: function() {
		return this.firstName.toLowerCase() + ((this.lastName) ? "-" + this.lastName.toLowerCase() : '');
	}
});

CharactersSchema = new SimpleSchema({

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
	japaneseName: {
		type: String,
		label: "Japanese Name",
		optional: true,
	},
	alternateName: {
		type: String,
		label: "Alternate Name",
		optional: true,
	},
	gender: {
		type: String,
		allowedValues: ["Male", "Female"],
		autoform: {
			firstOption: "Select Gender"
		},
		optional: true,
	},
	biography: {
		type: String,
		label: "Biography",
		max: 10000,
		autoform: {
			rows: 10
		},
		optional: true,
	},
	tags: {
		type: [String],
		label: "Character Tags",
		optional: true,
	}


});