Reviews = new Meteor.Collection("reviews");


Reviews.allow({

	insert: function(userId, doc) {
		// the user must be logged in, and the review must be created by the user
		return (userId && doc.userId === userId);
	},
	update: function(userId, doc, fields, modifier) {

		// can only update your own reviews
		return doc.userId === userId;

	},
	remove: function(userId, doc) {

		// can only remove reviews that you own
		return doc.userId === userId;

	}

});