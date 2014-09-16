Meteor.methods({
	followUser: function(followerId, userId) {

		// Ensure the currently logged in user wants to follow
		if (followerId !== Meteor.userId())
			throw new Meteor.Error(403, 'User mismatch, you must be logged in');

		// You cannot follow your self
		if (followerId === userId)
			throw new Meteor.Error(403, 'You cannot follow yourself');

		// Add followerId to the userId
		Meteor.users.update({_id: userId}, {$push: {followers: followerId}});

		// Add userId to the followerId (following)
		Meteor.users.update({_id: followerId}, {$push: {following: userId}});

		// Follower was added
		var properties = {
			followerId: followerId,
			followerUsername: Meteor.user().username
		};

		// We should alert the user that was followed 
		Meteor.call('createAlert', 'userFollow', properties, userId, function(error, result) {
			// To make the call async
		});

		return true; 

	},
	unFollowUser: function(followerId, userId) {

		// Ensure the currently logged in user wants to follow
		if (followerId !== Meteor.userId())
			throw new Meteor.Error(403, 'User mismatch, you must be logged in');

		// Remove follower id from the userId doc
		Meteor.users.update({_id: userId}, {$pull: {followers: followerId}});

		// Remove userId from the followerId doc (following)
		Meteor.users.update({_id: followerId}, {$pull: {following: userId}});

		// Follower was successfully removed
		return true;

	}
})