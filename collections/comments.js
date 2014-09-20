Comments = new Meteor.Collection('comments');

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