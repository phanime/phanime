Template.homePageSchedule.created = function() {
	var self = this;
	self.ready = new ReactiveVar(false);
	self.schedule = new ReactiveVar();

	// Temp
	var days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];

	var subscription = Meteor.subscribe("homePageSchedule");

	self.autorun(function() {
		if (subscription.ready()) {

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
			var schedule = [];

			libraryEntries.forEach(function(entry) {
				var anime = Anime.findOne({_id: entry.animeId});
				var dayNumber = moment(anime.startDate).day();
				if (schedule[dayNumber]) {
					schedule[dayNumber].push(entry);
				} else {
					schedule[dayNumber] = [entry];
				}
			});

			self.ready.set(true);
		} else {
			self.ready.set(false);
		}
	});
};

