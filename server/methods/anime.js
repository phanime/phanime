Meteor.methods({
    createAnime: function(anime) {

		// Ensure integerity of data
		check(anime, AnimeSchema);

		// Get auto values
		anime.slug = getSlug(anime.canonicalTitle);
		anime.createdAt = new Date();


		// Insert the document into the database
		Anime.insert(anime, function(error, _id) {
			console.log(_id);
		});

		console.log(anime);


	}
});