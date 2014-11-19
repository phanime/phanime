UserRevisionsController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();
			SEO.set({
				title: siteSettings.getFullTitle(user.displayName() + "'s Revisions"),
				meta: {
					'description' : user.displayName() + "'s contributions to phanime's database."
				},
				og: {
					'title' : siteSettings.getFullTitle(user.displayName() + "'s Revisions"),
					'description' : user.displayName() + "'s contributions to phanime's database.",
					'type' : 'profile',
					'image' : user.avatarImageUrl(),
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('userWithRevisions', this.params.username.toLowerCase());
	},

	data: function () {
		var user = Meteor.users.findOne({username: this.params.username.toLowerCase()});
		if (this.ready()) {

			if (user) {


				user.revisions = Revisions.find({userId: user._id}, {sort: {createdAt: -1}}).fetch();

				return user;
			} else {
				this.render('fourOhFour');
			}

		}
	}

});