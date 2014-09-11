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