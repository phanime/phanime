Meteor.publishComposite('indexCurrentUser', function() {
	return {
		find: function() {
			return Meteor.users.find({_id: this.userId});
		},
		children: [

			// For some reason this causes some errors, need to figure out what's wrong exactly
			// Possibly an issue with the user.following not being an array / or user.following not existing
			// {
			// 	find: function(user) {
			// 		return ProfilePosts.find({$or: [{userId: user._id}, {userId: {$in: user.following}}]});
			// 	},
			// 	children: [
			// 		{
			// 			// Publish the poster as well if it wasn't a status update
			// 			find: function(profilePost, user) {
			// 				if (profilePost.statusUpdate === false) {
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
					return Anime.find({_id: {$in: animeIds}}, {fields: requireCollectionFields.anime.imageAndTitle, limit: 12});
				}
			},
			{
				find: function(user) {
					return LibraryEntries.find({userId: user._id, $or : [{status: 'Watching'}, {status: 'Plan to watch'}]}, {limit: 6});
				},
				children: [
					{
						find: function(libraryEntry, user) {
							return Anime.find({_id: libraryEntry.animeId});
						}
					}
				]
			}
		]
	};
});