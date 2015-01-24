Revisions = new Meteor.Collection('revisions');

RevisionsSchema = new SimpleSchema({
	contentType: {
		type: String,
		allowedValues: [
			"Anime",
			"Person",
			"Character"
		],
		denyUpdate: true 
	},
	type: {
		type: String,
		allowedValues: [
			"Revision",
			"Addition"
		]
	},
	userId: {
		type: String,
		custom: function() {
			// Must be the current user
			if (this.value !== Meteor.userId()) 
				return "is not current user";
		},
		denyUpdate: true
	},
	username: {
		type: String,
		custom: function() {
			// Must match username. Just i
			if (this.value.toLowerCase() !== Meteor.user().username)
				return "Usernames don't match";
		},
		denyUpdate: true
	},
	status: {
		type: String,
		allowedValues: [
			"Open",
			"Approved",
			"Declined"
		],
		defaultValue: "Open"
	},
	content: {
		type: Object,
		blackbox: true // For now, until we figure out how we can conditionally determine the schema it should have
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();
			}
		},
		denyUpdate: true,
		optional: true // this is only made optional because validation before insert will not work if it was required, however, this does not make much of a difference as the createdAt value will still be generated on insert.
	},
	updatedAt: {
		type: Date,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true // this is only made optional because validation before insert will not work if it was required, however, this does not make much of a difference as the value will still be generated on update.
	}

});


Revisions.attachSchema(RevisionsSchema);

Revisions.createRevisionObject = function(contentType, type, userId, username, content) {

	return {
		contentType: contentType, // The content that's being revised (anime, character, people, etc)
		type: type, // Whether it's a Revision or an Addition
		userId: userId, // The user's id that's submitting the revision
		username: username, // The user's name that's submitting the revision
		status: "Open", // The status of the revision, whether it's Open, Approved, Rejected
		content: content, // The actual object that's being sent in, this could be Anime fields, Character Fields, and so on.
		updatedAt: new Date(),
		createdAt: new Date(),
	};



};


Revisions.allow({

	update: function(userId, doc, fields, modifier) {

		// can only update revisions if you're the moderator
		return Meteor.user().isModerator();

	}


});