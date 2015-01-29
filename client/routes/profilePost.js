ProfilePostsController = RouteController.extend({
	
	onAfterAction: function () {
		if (this.ready()) {
			var profilePost = this.data();

		// 	SEO.set({
		// 		title: siteSettings.getFullTitle(character.fullName()),
		// 		meta: {
		// 			'description' : character.biography
		// 		},
		// 		og: {
		// 			'title' : siteSettings.getFullTitle(character.fullName()),
		// 			'description' : character.biography,
		// 			'type' : 'profile',
		// 			'image' : character.coverImageUrl(),
		// 		}
		// 	});
		// }
	},

	waitOn: function () {
		return Meteor.subscribe('profilePost', this.params._id);
	},

	data: function () {
		var profilePost = ProfilePosts.findOne({_id: this.params._id});

		if (this.ready()) {

			if (profilePost) {
				return profilePost;
			} else {
				this.render('fourOhFour');
			}

		}

	}

});