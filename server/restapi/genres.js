HTTP.methods({
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
	}
});