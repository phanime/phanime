UserActivityController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();
			SEO.set({
				title: siteSettings.getFullTitle(user.displayName() + "'s Activity"),
				meta: {
					'description' : (user.profile) ? user.profile.about : ''
				},
				og: {
					'title' : siteSettings.getFullTitle(user.displayName() + "'s Activity"),
					'description' : (user.profile) ? user.profile.about : '',
					'type' : 'profile',
					'image' : user.avatarImageUrl(),
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('userWithActivity', this.params.username.toLowerCase());
	},

	data: function () {
		var user = Meteor.users.findOne({username: this.params.username.toLowerCase()});
		if (this.ready()) {

			if (user) {


				user.activity = Activity.find({userId: user._id}, {sort: {createdAt: -1}}).fetch();


				user.activity.forEach(function(activity) {
					if (activity.type === 'libraryEntry' && activity.libraryEntry.type === 'anime') {
					
						activity.libraryEntry.anime = Anime.findOne({_id: activity.libraryEntry.contentId});
					
					}

				});

				return user;
			} else {
				this.render('fourOhFour');
			}

		}
	}

});