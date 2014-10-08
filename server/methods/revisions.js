Meteor.methods({
	revisionsAnimeAdd: function(anime) {

		// Ensure integerity of data
		check(anime, AnimeRevisionsSchema);

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
	revisionsAnimeAddEdit: function(anime) {

		// The edited version of the anime is sent
		check(anime, AnimeRevisionsSchema);
		var oldAnime = Anime.findOne({_id: anime._id});
		var uniqueCondition;

		// if the canonicalTitle of the anime was changed...
		if (anime.canonicalTitle !== oldAnime.canonicalTitle) {

			// We'll need to regenerate the slug since the title changed
			anime.slug = getSlug(anime.canonicalTitle);

			// Ensure uniqueness
			var titleCheck = Anime.findOne({canonicalTitle: anime.canonicalTitle});
			var slugCheck = Anime.findOne({slug: anime.slug});


			if (titleCheck || slugCheck) {
				uniqueCondition = false;
				throw new Meteor.Error(403, "The canonical title of the anime was found in our database");

			} else {
				uniqueCondition = true;
			}

		} else {
			uniqueCondition = true;
		}

		// We also want to know if the coverImageChanged

		if (anime.coverImage !== oldAnime.coverImage) {
			// First of all this means that now coverImage contains a URL
			// additionally we'll now use the new url format 
			anime.newImageURLFormat = true;
		}

		// We want the anime to be unique and the user to be logged in
		// before we add in the revision
		if (uniqueCondition && Meteor.user()) {

			var revisionAnime = Revisions.createRevisionObject('Anime', 'Revision', Meteor.user()._id, Meteor.user().username, anime);

			// Insert the document into the database
			Revisions.insert(revisionAnime, function(error, _id) {
				console.log(_id);
			});

		}




	},
	revisionsAnimeUpdate: function(anime) {

		// Ensure integerity of data
		check(anime, AnimeRevisionsSchema);

		// If revision is an Addition (updated), we need to check for uniqueness

		// if anime._id exists than this anime already is in the database
		// in which case this is a revision, else it's an addition (updated)
		if (!anime._id) {

			var titleCheck = Anime.findOne({canonicalTitle: anime.canonicalTitle});
			var slugCheck = Anime.findOne({slug: getSlug(anime.canonicalTitle)});
			var uniqueCondition;

			if (titleCheck || slugCheck) {
				uniqueCondition = false;
				throw new Meteor.Error(403, "The canonical title of the anime was found in our database");
			} else {
				uniqueCondition = true;
			}

			if (uniqueCondition && Meteor.user()) {

				Revisions.update({_id: anime.revisionId}, {$set: {content: anime}}, function(error, num) {
					if (error)
						throw new Meteor.Error(403, error.reason);

				});

			}
		}


	},
	// Revision Approved 
	revisionApproved: function(revision) {

		// We should actually be pulling the revision from the database
		// to ensure the revision object itself hasn't been screwed up
		// during transmision. For now, we'll leave it be.

		// If the user isn't a moderator 
		// they cannot approve revisions
		if (!Meteor.user().isModerator())
			throw new Meteor.Error(403, "Only moderators are allowed to approve revisions");

		// Anime Additions should work
		if (revision.contentType === 'Anime') {


			// We can basically insert 
			if (revision.type === 'Addition') {
				// revision.content contains the anime object

				// We'll just throw it in the createAnimeObject method to generate the default fields
				var animeObject = Anime.createAnimeObject(revision.content);

				// Ensure uniqueness
				var titleCheck = Anime.findOne({canonicalTitle: animeObject.canonicalTitle});
				var slugCheck = Anime.findOne({slug: animeObject.slug});

				var uniqueCondition;

				if (titleCheck || slugCheck) {
					uniqueCondition = false;
				} else {
					uniqueCondition = true;
				}

				if (uniqueCondition) {

					var animeId = Anime.insert(animeObject);

					if (animeId) {
						console.log('we\'re about to upload the image');
						Meteor.call("uploadImageFromUrl", animeObject.coverImage, 'anime', 'cover', animeId, function(error, result) {
							if (error) {
								throw new Meteor.Error(403, error.reason);
							}
						});
					}


					// If the revisions's status was declined before, then we should remove a point from revisionsDeclinedCount and add one to revisionsApprovedCount 

					if (revision.status === 'Declined') {
						// Remove a point from declined count since we're actually making this revision approved now
						Meteor.users.update({_id: revision.userId}, {$inc: {revisionDeclinedCount: -1}});
					}

					// Update the user's positive scoring
					Meteor.users.update({_id: revision.userId}, {$inc: {revisionsApprovedCount: 1}});


					// We also update the revision's status to Approved here
					Revisions.update({_id: revision._id}, {$set: {status: "Approved", descicionByUsername: Meteor.user().username, descionByUserId: Meteor.user()._id}});


					return animeId;
				} else {
					throw new Meteor.Error(403, 'Anime is not unique');
				}
			}



		}
	
	},

	revisionDeclined: function(revision) {
		// Increase the declined revision count first
		Meteor.users.update({_id: revision.userId}, {$inc: {revisionDeclinedCount: 1}});

		// Update the revision's status to declined
		Revisions.update({_id: revision._id}, {$set: {status: "Declined", descicionByUsername: Meteor.user().username, descionByUserId: Meteor.user()._id}});
	},

	revisionReopen: function(revision) {
		// Increase the declined revision count first

		// if the revision was declined before, we should remove a point from declined count, since we're re-opening it.
		if (revision.status === 'Declined') {
			Meteor.users.update({_id: revision.userId}, {$inc: {revisionDeclinedCount: -1}});
		} else if (revision.status === 'Approved') {
			// You can't Open an Approved revision, however, if that functionality is ever added 
			// this will remove 1 from approved count
			Meteor.users.update({_id: revision.userId}, {$inc: {revisionApprovedCount: -1}});
		}

		// Update the revision's status to declined
		Revisions.update({_id: revision._id}, {$set: {status: "Open", descicionByUsername: Meteor.user().username, descionByUserId: Meteor.user()._id}});

	}
});