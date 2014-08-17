HTTP.methods({
	'api/v1/episodes': {
		get: function(data) {
			this.setContentType('application/json');
			var episodes = Episodes.find();
			var test = [];

			episodes.forEach(function(episode) {
				//test.push(episode);

				test.push(episode);

				// // Second run through
				// delete episode.animeIdOld;

				// if (episode.episodeTitle === '') {
				// 	episode.episodeTitle = null;
				// }

				// Episodes.remove(episode._id);
				// delete episodes._id;
				// Episodes.insert(episode);

				// // Delete the old one and insert a new one 

				// // Find episode's anime 
				// var anime = Anime.findOne({id: episode.animeIdOld});

				// episode.animeId = anime._id;

				// episode.createdAt = new Date();
				// episode.updatedAt = new Date();		

				// // Remove the old episode
				// Episodes.remove(episode._id);

				// delete episode._id;


				// // We'll just remove the old ids
				// delete episode.userIdOld;

				// // Remove extra stuff
				// delete episode.name;
				// delete episode.episodeMultiple;
				// delete episode.episodeNumberOther;


				// Episodes.insert(episode);

			});

			//return "Finished";
			return JSON.stringify(test);		
		}
	},
});