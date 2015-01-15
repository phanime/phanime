CustomListController = RouteController.extend({

	onAfterAction: function () {

		if (this.ready()) {
			var customList = this.data();

			// This is mainly to hide any type of information from users
			var title = customList.privacy ? 'Private' : customList.title;
			var description = customList.privacy ? 'Private' : customList.description;
			SEO.set({
				title: siteSettings.getFullTitle(title),
				meta: {
					'description' : description
				},
				og: {
					'title' : siteSettings.getFullTitle(title),
					'description' : description
				}
			});
		}
	},

	waitOn: function () {
		var limit = 20;
		return Meteor.subscribe('customList', this.params._id, limit);
	},

	data: function () {
		var customList = CustomLists.findOne({_id: this.params._id});

		if (this.ready()) {
			return customList;
		}

	}

});
