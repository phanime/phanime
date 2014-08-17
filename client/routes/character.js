CharacterController = RouteController.extend({
	
	onBeforeAction: function () {
		console.log('Thing are going well');
	},

	onAfterAction: function () {
		console.log('Everything worked');
	},

	waitOn: function () {
		return Meteor.subscribe('character', this.params._id);
	},

	data: function () {
		return Characters.findOne({_id: this.params._id});
	}

});