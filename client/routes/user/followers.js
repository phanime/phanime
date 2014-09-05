UserFollowersController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();

			SEO.set({
				title: user.username + "'s Followers | Phanime",
				meta: {
					'description' : user.profile.about
				},
				og: {
					'title' : user.username + "'s Followers | Phanime" ,
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
			
			user.followersFull = Meteor.users.find({_id: {$in: user.followers}});

		}

		return user;
	}

});