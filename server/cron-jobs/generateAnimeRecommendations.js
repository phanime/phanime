SyncedCron.add({
	name: 'Generate Anime Recommendations',
	schedule: function(parser) {
		// parser is a later.parse object
		return parser.text('every 1 minutes');
	}, 
	job: function() {
		Meteor.call('generateAnimeRecommendations', 'rFyM4MiRNRDyH35nZ', function(error, results) {
			console.log(error);
			console.log(results);
		});
	}
});