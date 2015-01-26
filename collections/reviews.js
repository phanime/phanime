Reviews = new Meteor.Collection("reviews");

ReviewsSchema = new SimpleSchema({
	animeId: {
		type: String,
		custom: function() {
			// Check that an anime from this ID actually exists
			if (!Anime.findOne({_id: this.value})) {
				return "No anime found with this animeId";
			}
		},
		denyUpdate: true
	},
	userId: {
		type: String,
		custom: function() {
			// Ensure the user is the current user
			if (this.value !== Meteor.userId())
				return "User is not current user";
		},
		denyUpdate: true
	},
	content: {
		type: String,
		min: 10,
		max: 10000 // We can't have reviews be too long
	},
	summary: {
		type: String,
		min: 1,
		max: 140
	},
	storyRating: {
		type: Number,
		min: 1,
		max: 10
	},
	animationRating: {
		type: Number,
		min: 1,
		max: 10
	},
	characterRating: {
		type: Number,
		min: 1,
		max: 10
	},
	soundRating: {
		type: Number,
		min: 1,
		max: 10
	},
	enjoymentRating: {
		type: Number,
		min: 1,
		max: 10
	},
	overallRating: {
		type: Number,
		min: 1,
		max: 10
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


Reviews.attachSchema(ReviewsSchema);


Reviews.helpers({
	user: function() {
		return Meteor.users.findOne({_id: this.userId});
	}
});



Reviews.allow({

	insert: function(userId, doc) {
		// the user must be logged in, and the review must be created by the user
		var userCondition = (userId && doc.userId === userId);

		// We need to ensure that there is only one review per anime per user
		var reviewCheck = Reviews.findOne({animeId: doc.animeId, userId: userId});
		var uniqueCondition;

		console.log(reviewCheck);

		if (reviewCheck) {
			uniqueCondition = false;
		} else {
			uniqueCondition = true;
		}

		
		return userCondition && uniqueCondition;

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