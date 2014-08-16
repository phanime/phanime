HTTP.methods({
	'api/v1/anime': {
		get: function(data) {
			this.setContentType('application/json');
			var anime = Anime.find();
			var test = [];
			anime.forEach(function(anime) {


				test.push(anime);

				// Delete the old one and insert a new one (for now we'll just insert);
				// Anime.remove(anime._id);
				
				// delete anime._id;
				// anime.createdAt = new Date();
				// anime.updatedAt = new Date();

				// Anime.insert(anime);
				
			});

			return JSON.stringify(test);		
		}
	},
	'api/v1/genres': {
		get: function(data) {
			this.setContentType('application/json');
			var genres = Genres.find();
			var test = [];
			genres.forEach(function(genre) {


				test.push(genre);

				// Delete the old one and insert a new one

				// Genres.remove(genre._id);
				// delete genre._id;
				// Genres.insert(genre);
				
			});

			return JSON.stringify(test);		
		}
	},	
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
