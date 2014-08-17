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
	}
});
