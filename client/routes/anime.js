AnimeController = RouteController.extend({
	
	// onBeforeAction: function () {
	// 	console.log('Thing are going well');
	// },
	onAfterAction: function () {
	
		if (this.ready()) {
			var anime = this.data();
			console.log(this.data());

			SEO.set({
				title: anime.canonicalTitle + " | phanime",
				meta: {
					'description' : anime.description
				},
				og: {
					'title' : anime.canonicalTitle + " | phanime" ,
					'description' : anime.description,
					'type' : 'video.tv_show',
					'image' : anime.coverImageUrl(),
					'video:release_date' : anime.startDate
				}
			});
		}
	},

	waitOn: function () {
		return Meteor.subscribe('animeBySlug', this.params.slug);
	},

	data: function () {
		var anime = Anime.findOne({slug: this.params.slug});


		// Add episodes once the subscription is ready
		if (this.ready()) {
			if (anime) {
				anime.episodes = Episodes.find({animeId: anime._id}, {sort: {episodeNumber: 1}});
				anime.castings = Castings.find({animeId: anime._id});
				anime.staffMembers = StaffMembers.find({animeId: anime._id});
				anime.libraryEntry = LibraryEntries.findOne({animeId: anime._id});
				anime.reviews = Reviews.find({animeId: anime._id});		
				return anime;
			} else {
				this.render('fourOhFour');
			}
		} else {
			this.render('loading');
		}

	}

});