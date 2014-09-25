PersonController = RouteController.extend({
	
	// onBeforeAction: function () {
	// 	console.log('Thing are going well');
	// },

	onAfterAction: function () {
		if (this.ready()) {
			var person = this.data();

			SEO.set({
				title: siteSettings.getFullTitle(person.fullName()),
				meta: {
					'description' : person.otherInfo
				},
				og: {
					'title' : siteSettings.getFullTitle(person.fullName()),
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

				person.castings = Castings.find({personId: person._id}).fetch();
				var animeIds = [];
				var characterIds = [];
				person.castings.forEach(function(casting) {

					animeIds.push(casting.animeId);
					characterIds.push(casting.characterId);

				});

				person.anime = Anime.find({_id: {$in: animeIds}});
				person.characters = Characters.find({_id: {$in: characterIds}});

				return person;

			} else {
				this.render('fourOhFour');
			}

		}
	}

});