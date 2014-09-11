ProfilePosts = new Meteor.Collection('profilePost');

// Types of activity


ProfilePosts.postFields = function(statusUpdate, posterId, content) {
	var post = {
		statusUpdate: statusUpdate, // Could either be true or false 
		posterId: posterId, // if statusUpdate is true posterId would be equal to userId
		content: content,
		createdAt: new Date()
	};

	return post;
};

ProfilePosts.allow({

	insert: function(userId, doc) {
		// the user must be logged in, and the profile post must be created by the user
		return (userId && doc.userId === userId);
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