PersonController = RouteController.extend({
	
	// onBeforeAction: function () {
	// 	console.log('Thing are going well');
	// },

	onAfterAction: function () {
		if (this.ready()) {
			var person = this.data();

			SEO.set({
				title: person.fullName() + " | Phanime",
				meta: {
					'description' : person.otherInfo
				},
				og: {
					'title' : person.fullName() + " | Phanime" ,
					'description' : person.otherInfo,
					'type' : 'profile',
					'image' : person.coverImageUrl(),
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('person', this.params._id);
	},

	data: function () {
		var person = People.findOne({_id: this.params._id});

		if (this.ready()) {

			if (person) {
				return person;
			} else {
				this.render('fourOhFour');
			}

		} else {
			this.render('loading');
		}
	}

});