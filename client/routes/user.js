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
		return Meteor.subscribe('user', this.params.username);
	},

	data: function () {
		return Meteor.users.findOne({username: this.params.username});
	}

});