UserActivityController = RouteController.extend({
	// increment: 20,
	// limit: function() {
	// 	if (Session.get('activityItemsLimit')) {
	// 		return Session.get('activityItemsLimit');
	// 	} else {
	// 		// Default to return 20 items initially
	// 		Session.set('activityItemsLimit', 20);
	// 		return Session.get('activityItemsLimit');
	// 	}
	// },
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
		// We send the limit as 20 because we want it to be intially to be 20;
		return Meteor.subscribe('userWithActivity', this.params.username.toLowerCase(), 20);
	},

	data: function () {
		var user = Meteor.users.findOne({username: this.params.username.toLowerCase()});
		if (this.ready()) {
			if (user) {
				return user;
			} else {
				this.render('fourOhFour');
			}
		}
	}

});