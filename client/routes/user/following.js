UserFollowingController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();

			SEO.set({
				title: user.username + "'s Followees | Phanime",
				meta: {
					'description' : user.profile.about
				},
				og: {
					'title' : user.username + "'s Followees | Phanime" ,
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