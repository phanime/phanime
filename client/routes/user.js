UserController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();

			SEO.set({
				title: user.username + "'s Profile | Phanime",
				meta: {
					'description' : user.about
				},
				og: {
					'title' : user.username + "'s Profile | Phanime" ,
					'description' : user.about,
					'type' : 'profile',
					'image' : user.avatarImageUrl(),
				}
			});
		}
	},


	waitOn: function () {
		return Meteor.subscribe('userWithActivity', this.params.username);
	},

	data: function () {

		var user = Meteor.users.findOne({username: this.params.username});
		if (this.ready()) {
			console.log(user);
			user.activity = Activity.find({userId: user._id}, {sort: {createdAt: -1}});
		}

		return user;
	}

});