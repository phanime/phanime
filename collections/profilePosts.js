ProfilePosts = new Meteor.Collection('profilePost');

ProfilePostsSchema = new SimpleSchema({
	statusUpdate: {
		type: Boolean
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
	posterId: {
		type: String,
		custom: function() {
			// Must be the current user
			if (this.value !== Meteor.userId()) 
				return "Poster is not current user";
		},
		denyUpdate: true
	},
	content: {
		type: String,
		min: 1,
		max: 140
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


ProfilePosts.attachSchema(ProfilePostsSchema);


ProfilePosts.allow({

	insert: function(userId, doc) {
		// the user must be logged in, and the profile post must be created by the user
		return (userId && doc.posterId === userId);
	},
	update: function(userId, doc, fields, modifier) {

		// can only update their own profile posts
		return doc.userId === userId;

	},
	remove: function(userId, doc) {

		// can only remove profile posts that they created
		return doc.userId === userId;

	}


});