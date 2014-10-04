Meteor.methods({
    revisionsAnimeAdd: function(anime) {

		// Ensure integerity of data
		check(anime, AnimeSchema);

		// Get auto values
		anime.slug = getSlug(anime.canonicalTitle);
		anime.createdAt = new Date();

		// Ensure uniqueness
		var titleCheck = Anime.findOne({canonicalTitle: anime.canonicalTitle});
		var slugCheck = Anime.findOne({slug: anime.slug});

		var uniqueCondition;

		if (titleCheck || slugCheck) {
			uniqueCondition = false;
			throw new Meteor.Error(403, "Anime not unique");

		} else {
			uniqueCondition = true;
		}

		if (uniqueCondition) {


			// Insert the document into the database
			Revisions.insert(anime, function(error, _id) {
				console.log(_id);
			});

		} else {
			console.log ('Anime is not unique!');
		}


	}
});