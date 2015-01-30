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
		max: 500
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
	likes: {
		type: [String],
		optional: true,
		denyInsert: true,
		custom: function() {
			if (this.isInsert || !this.docId)
				return

			var comment = Comments.findOne({_id: this.docId});
			var likesArray = comment.likes;
			var increment = 0;

			if (this.operator === "$push" || this.operator === "$addToSet") {
				likesArray.push(this.value);
			} else if (this.operator === "$pull") {
				likesArray = _.without(likesArray, this.value);
			}

			if (this.value && _.uniq(likesArray).length !== likesArray.length) {
				return "Duplicates found!";
			}
		}
	},
	likeCount: {
		type: Number,
		min: 0,
		optional: true,
		denyInsert: true,
		custom: function() {
			// We should ensure that the count here is the same as the length of 
			// the likes array.

			// We can't use this.field("likes").value because it grabs the modified
			// which doesn't help since it's just the value of the current user

				// if this is an insert, we'll just return 
				if (this.isInsert || !this.docId)
					return;

				var comment = Comments.findOne({_id: this.docId});
				var likesArray = comment.likes;
				var likeCount = comment.likeCount || 0;


				// We add the +1 to the length because the likes actually has a modifier value that it's going to add
				// which would mean the array's length will grow by one, from then we should compare the new likeCount
				// which is what we are doing now by adding the +1/-1
				var increment;
				if (this.field("likes").value && this.field("likes").operator === "$push" || this.field("likes").operator === "$addToSet") {
					increment = 1;
				} else if (this.field("likes").value && this.field("likes").operator === "$pull") {
					increment = -1;
				} else {
					// This will make the following condition fail
					increment = 0;
				}

				if (likesArray && likesArray.length + increment !== likeCount + this.value) {
					return "Inconsistency between like count and actual likes";
				}
		}
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
