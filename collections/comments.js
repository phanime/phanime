Comments = new Meteor.Collection('comments');

CommentsSchema = new SimpleSchema({
	type: {
		type: String,
		allowedValues: [
			"profilePost",
			"customList"
		],
		denyUpdate: true
	},
	contentId: {
		type: String,
		denyUpdate: true
	},
	content: {
		type: String,
		min: 1,
		max: 140
	},
	userId: {
		type: String,
		custom: function() {
			// Check that a user from this ID actually exists
			if (!Meteor.users.findOne({_id: this.value})) {
				return "No user found with this userId";
			}
		},
		denyUpdate: true
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
	},
});


Comments.attachSchema(CommentsSchema);

Comments.allow({

	insert: function(userId, doc) {
		// the user must be logged in, and the comment must be created by the user
		return (userId && doc.userId === userId);
	},
	update: function(userId, doc, fields, modifier) {

		// can only update their own comments
		return doc.userId === userId;

	},
	remove: function(userId, doc) {

		// can only remove comments that they created
		return doc.userId === userId;
	}

});


Comments.helpers({
	user: function() {
		return Meteor.users.findOne({_id: this.userId});
	}
});
