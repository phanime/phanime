UserController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();

			if (user) {
				SEO.set({
					title: user.username + "'s Profile" + " " + siteSettings.separator + " " + siteSettings.title,
					meta: {
						'description' : user.about
					},
					og: {
						'title' : user.username + "'s Profile" + " " + siteSettings.separator + " " + siteSettings.title,
						'description' : user.about,
						'type' : 'profile',
						'image' : user.avatarImageUrl(),
					}
				});
			}
		}
	},


	waitOn: function () {
		return Meteor.subscribe('userWithProfilePosts', this.params.username);
	},

	data: function (pause) {

		var user = Meteor.users.findOne({username: this.params.username});
		if (this.ready()) {

			if (user) {
				user.profilePosts = ProfilePosts.find({userId: user._id}, {sort: {createdAt: -1}}).fetch();

				user.profilePosts.forEach(function(profilePost) {

					profilePost.poster = Meteor.users.findOne({_id: profilePost.posterId});

				});

				return user;
			} else {
				this.render('fourOhFour');
			}

		}
	}

});