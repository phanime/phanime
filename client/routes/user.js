UserController = RouteController.extend({

	onAfterAction: function () {
		if (this.ready()) {
			var user = this.data();

			if (user) {
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
		}
	},


	waitOn: function () {
		return Meteor.subscribe('userWithActivity', this.params.username);
	},

	// notFoundTemplate: 'fourOhFour',
	data: function (pause) {

		var user = Meteor.users.findOne({username: this.params.username});
		if (this.ready()) {

			if (user) {
				user.activity = Activity.find({userId: user._id}, {sort: {createdAt: -1}}).fetch();


				user.activity.forEach(function(activity) {
					if (activity.type === 'libraryEntry' && activity.libraryEntry.type === 'anime') {
					
						activity.libraryEntry.anime = Anime.findOne({_id: activity.libraryEntry.contentId});
					
					} else if (activity.type === 'post') {
						
						activity.post.poster = Meteor.users.findOne({_id: activity.post.posterId});
					
					}

				});

				return user;
			} else {
				this.render('fourOhFour');
			}

		}
	}

});