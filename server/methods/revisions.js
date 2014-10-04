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
			throw new Meteor.Error(403, "The canonical title of the anime was found in our database");

		} else {
			uniqueCondition = true;
		}

		// We want the anime to be unique and the user to be logged in
		// before we add in the revision
		if (uniqueCondition && Meteor.user()) {

			var revisionAnime = Revisions.createRevisionObject('Anime', 'Addition', Meteor.user()._id, Meteor.user().username, anime);

			// Insert the document into the database
			Revisions.insert(revisionAnime, function(error, _id) {
				console.log(_id);
			});

		}


	},

	// Revision Approved 
	revisionApproved: function(revision) {

		// If the user isn't a moderator 
		// they cannot approve revisions
		if (!Meteor.user().isModerator())
			throw new Meteor.Error(403, "Only moderators are allowed to approve revisions");

		// Anime Additions should work
		if (revision.contentType === 'Anime') {


			// We can basically insert 
			if (revision.type === 'Addition') {
				// revision.content contains the anime object

				// We'll just throw it in the createAnimeObject method to grab the default fields 
				var animeObject = Anime.createAnimeObject(revision.content);


				Anime.insert(animeObject, function(error, _id) {
					console.log(_id);

					if (error) 
						throw new Meteor.Error(403, error.reason);
				});
			}



		}



	}
});