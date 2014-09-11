UserActivityController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();

			SEO.set({
				title: user.username + "'s Activity | Phanime",
				meta: {
					'description' : user.profile.about
				},
				og: {
					'title' : user.username + "'s Activity | Phanime" ,
					'description' : user.profile.about,
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