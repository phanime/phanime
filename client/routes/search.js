SearchController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: "Search | Phanime"
		});
	},

	waitOn: function () {
		return Meteor.subscribe('searchAnime', this.params.q);
	},

	data: function () {
		return People.find({_id: this.params._id});
	}

});