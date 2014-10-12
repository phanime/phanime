UserFollowingController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();

			SEO.set({
				title: siteSettings.getFullTitle(user.displayName() + "'s Followees"),
				meta: {
					'description' : user.profile.about
				},
				og: {
					'title' : siteSettings.getFullTitle(user.displayName() + "'s Library"),
					'description' : user.profile.about,
					'type' : 'profile',
					'image' : user.avatarImageUrl(),
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('userWithFollowing', this.params.username);
	},

	data: function () {
		var user = Meteor.users.findOne({username: this.params.username});
		
		if (this.ready()) {
			
			if (user.following)
				user.followingFull = Meteor.users.find({_id: {$in: user.following}});

		}

		return user;
	}

});