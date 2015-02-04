Meteor.publish('homePageSchedule', function() {

	if (!this.userId) {
		// User must be logged in
		return;
	}


	var anime = Anime.find({
				$and: [
					{
						$or: [{
							endDate: {$gte: new Date()}
						},
						{
							endDate: {$exists: false}
						},
						{
							endDate: "0000-00-00" // For the dates that are still represented as strings
						}]
					},
					{
						startDate: {
							$lt: new Date()
						}
					}
				]
			});


	var animeIds = _.pluck(anime.fetch(), '_id');

	var libraryEntries = LibraryEntries.find({userId: this.userId, status: "Watching", animeId: {$in: animeIds}});

	return [
		anime,
		libraryEntries
	];


});