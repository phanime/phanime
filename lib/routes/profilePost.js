ProfilePostController = RouteController.extend({
	
	onAfterAction: function () {
		if (this.ready()) {
			var profilePost = this.data();
			var poster = profilePost.poster();
			SEO.set({
				title: siteSettings.getFullTitle(poster.displayName() + "'s profile post"),
				og: {
					'title' : siteSettings.getFullTitle(poster.displayName() + "'s profile post"),
					'image' : poster.avatarImageUrl()
				}
			});		

		}
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