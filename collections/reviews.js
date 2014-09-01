Reviews = new Meteor.Collection("reviews");

Reviews.helpers({
	user: function() {
		return Meteor.users.findOne({_id: this.userId});
	}
});



Reviews.allow({

	insert: function(userId, doc) {
		// the user must be logged in, and the review must be created by the user
		var userCondition = (userId && doc.userId === userId);

		var contentCondition = (doc.content && doc.content.length > 10 && doc.summary && doc.summary.length <= 140 );

		var ratingCondition = (doc.overallRating >= 1 && doc.overallRating <= 10);

		console.log(userCondition);
		console.log(contentCondition);
		console.log(ratingCondition);
		
		return userCondition && contentCondition && ratingCondition;

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