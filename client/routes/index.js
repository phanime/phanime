IndexController = RouteController.extend({
	
	onBeforeAction: function () {
		console.log('This is the index');
	},

	onAfterAction: function () {

	},

	waitOn: function () {
		return Meteor.subscribe('anime', this.params._id);
	},

	data: function () {
		//return anime.find();
	}	

});