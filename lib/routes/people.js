PeopleController = RouteController.extend({
	
	onBeforeAction: function () {
		SEO.set({
			title: siteSettings.getFullTitle("People"),
			meta: {
				'description' : 'Explore the people related to anime shows on phanime'
			}
		});
		this.next();
	},

	waitOn: function () {
		return Meteor.subscribe('people');
	},

	data: function () {
		return People.find({}, {sort: {createdAt: -1}});
	}

});