CustomListEditController = RouteController.extend({
	
	onAfterAction: function () {
	
		if (this.ready()) {
			var customList = this.data();

			SEO.set({
				title: siteSettings.getFullTitle(customList.title + " - Edit"),
				meta: {
					'description' : customList.description
				},
				og: {
					'title' : siteSettings.getFullTitle(customList.title + " - Edit"),
					'description' : customList.description
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('customListEdit', this.params._id);
	},

	data: function () {
		var customList = CustomLists.findOne({_id: this.params._id});


		// Add episodes once the subscription is ready
		if (this.ready()) {
			if (customList) {
				// This is where we would be attaching the comments to the custom list
				return customList;
			} else {
				this.render('fourOhFour');
			}
		}

	}

});