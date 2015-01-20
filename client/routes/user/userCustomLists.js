UserCustomListsController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();
			SEO.set({
				title: siteSettings.getFullTitle(user.displayName() + "'s Custom lists"),
				meta: {
					'description' : user.displayName() + "'s custom lists."
				},
				og: {
					'title' : siteSettings.getFullTitle(user.displayName() + "'s Custom lists"),
					'description' : user.displayName() + "'s custom lists",
					'type' : 'profile',
					'image' : user.avatarImageUrl(),
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('userCustomLists', this.params.username.toLowerCase());
	},

	data: function () {
		var user = Meteor.users.findOne({username: this.params.username.toLowerCase()});
		if (this.ready()) {

			if (user) {
				user.customLists = CustomLists.find({userId: user._id}, {sort: {createdAt: -1}}).fetch();
				return user;
			} else {
				this.render('fourOhFour');
			}

		}
	}

});