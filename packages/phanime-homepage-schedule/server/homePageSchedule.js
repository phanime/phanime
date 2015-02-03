Meteor.publish('homePageSchedule', function() {


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

	var libraryEntries = LibraryEntries.find({status: "Watching", animeId: {$in: animeIds}});

	return [
		anime,
		libraryEntries
	];


});