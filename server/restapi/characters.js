HTTP.methods({
	'api/v1/characters': {
		get: function(data) {
			this.setContentType('application/json');
			var characters = Characters.find();
			var test = [];
			characters.forEach(function(character) {


				test.push(character);

				// Delete the old one and insert a new one
				// Characters.remove(character._id);
				
				// delete character._id;
				// character.createdAt = new Date();
				// character.updatedAt = new Date();

				// Characters.insert(character);
				
			});

			return JSON.stringify(test);		
		}
	}
});
