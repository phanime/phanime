CharacterController = RouteController.extend({
	
	// onBeforeAction: function () {
	// 	console.log('Thing are going well');
	// },

	onAfterAction: function () {
		if (this.ready()) {
			var character = this.data();

			SEO.set({
				title: character.fullName() + " | phanime",
				meta: {
					'description' : character.biography
				},
				og: {
					'title' : character.fullName() + " | phanime" ,
					'description' : character.biography,
					'type' : 'profile',
					'image' : character.coverImageUrl(),
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('character', this.params._id);
	},

	data: function () {
		return Characters.findOne({_id: this.params._id});
	}

});