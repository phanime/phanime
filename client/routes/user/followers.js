UserFollowersController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();

			SEO.set({
				title: siteSettings.getFullTitle(user.username + "'s Followers"),
				meta: {
					'description' : user.profile.about
				},
				og: {
					'title' : siteSettings.getFullTitle(user.username + "'s Library"),
					'description' : user.profile.about,
					'type' : 'profile',
					'image' : user.avatarImageUrl(),
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('userWithFollowers', this.params.username);
	},

	data: function () {
		var user = Meteor.users.findOne({username: this.params.username});
		
		if (this.ready()) {
			
			if (user.followers)
				user.followersFull = Meteor.users.find({_id: {$in: user.followers}});

		}

		return user;
	}

});