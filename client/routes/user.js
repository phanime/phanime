UserController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();

			if (user) {
				SEO.set({
					title: siteSettings.getFullTitle(user.displayName() + "'s Profile"),
					meta: {
						'description' : user.about
					},
					og: {
						'title' : siteSettings.getFullTitle(user.displayName() + "'s Profile"),
						'description' : user.about,
						'type' : 'profile',
						'image' : user.avatarImageUrl(),
					}
				});
			}
		}
	},


	waitOn: function () {
		return Meteor.subscribe('userWithProfilePosts', this.params.username.toLowerCase());
	},

	data: function (pause) {

		// Meteor.call('getMALUserList', 'faeronsayn', function(err, result) {
		// 	console.log(result);
		// 	console.log
		// });

		var user = Meteor.users.findOne({username: this.params.username.toLowerCase()});
		if (this.ready()) {

			if (user) {
				user.profilePosts = ProfilePosts.find({userId: user._id}, {sort: {createdAt: -1}}).fetch();

				user.profilePosts.forEach(function(profilePost) {

					profilePost.poster = Meteor.users.findOne({_id: profilePost.posterId});

					// profilePost.comments = Comments.find({contentId: profilePost._id, type: 'profilePost'}, {sort: {createdAt: 1}}).fetch();

					// profilePost.comments.forEach(function(comment) {
					// 	comment.user = Meteor.users.findOne({_id: comment.userId});
					// });

				});
				return user;
			} else {
				this.render('fourOhFour');
			}

		}
	}

});