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


Revisions.helpers({

	contentDoc: function() {
		switch (this.contentType) {
			case "Anime":
				return Anime.findOne({_id: this.content._id});
		}
	}

});


Revisions.allow({

	update: function(userId, doc, fields, modifier) {
		// can only update revisions if you're the moderator
		return Meteor.user().isModerator();
	}


});