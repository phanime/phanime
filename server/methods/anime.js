Meteor.methods({
    createAnime: function(anime) {

		// Ensure integerity of data
		check(anime, AnimeSchema);

		// Get auto values
		anime.slug = getSlug(anime.canonicalTitle);
		anime.createdAt = new Date();

		// Ensure uniqueness
		var titleCheck = Anime.findOne({canonicalTitle: anime.canonicalTitle});
		var slugCheck = Anime.findOne({slug: anime.slug});

		var uniqueCondition;

		console.log(titleCheck);
		console.log(slugCheck);

		if (titleCheck || slugCheck) {
			uniqueCondition = false;
		} else {
			uniqueCondition = true;
		}

		if (uniqueCondition) {


			// Insert the document into the database
			Anime.insert(anime, function(error, _id) {
				console.log(_id);
			});

			console.log(anime);

		} else {
			console.log ('Anime is not unique!');
		}


	}
});