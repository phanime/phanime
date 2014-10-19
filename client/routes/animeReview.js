AnimeReviewController = RouteController.extend({
	

	onAfterAction: function () {
		// if (this.ready()) {
		// 	var review = this.data();

		// 	SEO.set({
		// 		title: siteSettings.getFullTitle(character.fullName()),
		// 		meta: {
		// 			'description' : character.biography
		// 		},
		// 		og: {
		// 			'title' : siteSettings.getFullTitle(character.fullName()),
		// 			'description' : character.biography,
		// 			'type' : 'review',
		// 			'image' : character.coverImageUrl(),
		// 		}
		// 	});
		// }
	},

	waitOn: function () {
		return Meteor.subscribe('animeReview', this.params._id);
	},

	data: function () {

		console.log("Finished");

		// console.log(this.data())
		// var character = Characters.findOne({_id: this.params._id});

		// if (this.ready()) {

		// 	if (character) {
		// 		character.castings = Castings.find({characterId: character._id}).fetch();
		// 		var animeIds = [];
		// 		var peopleIds = [];
		// 		character.castings.forEach(function(casting) {

		// 			animeIds.push(casting.animeId);
		// 			peopleIds.push(casting.personId);

		// 		});

		// 		character.anime = Anime.find({_id: {$in: animeIds}});
		// 		character.people = People.find({_id: {$in: peopleIds}});

		// 		return character;
		// 	} else {
		// 		this.render('fourOhFour');
		// 	}

		// }

	}

});