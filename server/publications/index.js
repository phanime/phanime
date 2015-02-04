Meteor.publishComposite('indexCurrentUser', function() {
	return {
		find: function() {
			return Meteor.users.find({_id: this.userId});
		},
		children: [

			// // For some reason this causes some errors, need to figure out what's wrong exactly
			// // Possibly an issue with the user.following not being an array / or user.following not existing
			// {
			// 	find: function(user) {
			// 		if (!user.following) {
			// 			user.following = [];
			// 		}

			// 		return ProfilePosts.find({$or: [{userId: user._id}, {statusUpdate: true, userId: {$in: user.following}}]});
			// 	},
			// 	children: [
			// 		{
			// 			// Publish the poster if it's not the current user
			// 			find: function(profilePost, user) {
			// 				if (profilePost.posterId !== this.userId) {
			// 					return Meteor.users.find({_id: profilePost.posterId}, {fields: {username: 1, profile: 1}});
			// 				}
			// 			}
			// 		},
			// 		{

			// 			// Publish the profile post's comments
			// 			find: function(profilePost, user) {

			// 				return Comments.find({contentId: profilePost._id, type: 'profilePost'});

			// 			},
			// 			children : [
			// 				{
			// 					find: function(comment, profilePost, user) {
			// 						// Publish users if it isn't published 
			// 						if (comment.userId !== user._id && comment.userId !== profilePost.posterId) {
			// 							return Meteor.users.find({_id: comment.userId}, {fields: {username: 1, profile: 1}});
			// 						}
			// 					}
			// 				}

			// 			]

			// 		}
			// 	]
			// },
			{
				find: function(user) {
					var animeIds = _.pluck(user.recommendedAnime, 'animeId');
					// Limit to 12 recommendations for now
					return Anime.find({_id: {$in: animeIds}}, {fields: requireCollectionFields.anime.requiredLibraryEntry, limit: 12});
				},
				children: [
					{
						find: function(anime, user) {
							return LibraryEntries.find({userId: user._id, animeId: anime._id});
						}
					}
				]
			},
			{
				find: function(user) {
					return LibraryEntries.find({userId: user._id, $or : [{status: 'Watching'}, {status: 'Plan to watch'}]}, {sort: {updatedAt: -1}, limit: 6});
				},
				children: [
					{
						find: function(libraryEntry, user) {
							return Anime.find({_id: libraryEntry.animeId}, {fields: requireCollectionFields.anime.requiredLibraryEntry});
						}
					}
				]
			}
		]
	};
});