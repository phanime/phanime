CustomListController = RouteController.extend({

	onAfterAction: function () {

		if (this.ready()) {
			var customList = this.data();

			SEO.set({
				title: siteSettings.getFullTitle(customList.title),
				meta: {
					'description' : customList.description
				},
				og: {
					'title' : siteSettings.getFullTitle(customList.title),
					'description' : customList.description
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('customList', this.params._id);
	},

	data: function () {
		var customList = CustomLists.findOne({_id: this.params._id});

		if (this.ready()) {
			return customList;
		}

	}

});
