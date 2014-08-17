PersonController = RouteController.extend({
	
	onBeforeAction: function () {
		console.log('Thing are going well');
	},

	onAfterAction: function () {
		console.log('Everything worked');
	},

	waitOn: function () {
		return Meteor.subscribe('person', this.params._id);
	},

	data: function () {
		return People.findOne({_id: this.params._id});
	}

});