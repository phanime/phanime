HTTP.methods({
	'api/v1/people': {
		get: function(data) {
			this.setContentType('application/json');
			var people = People.find();
			var test = [];

			people.forEach(function(person) {

				//People.update({_id: person._id}, {$unset: {coverImageUrl: ""}});
				test.push(person);

				// Delete the old one and insert a new one
				// People.remove(person._id);
				
				// delete person._id;
				// person.createdAt = new Date();
				// person.updatedAt = new Date();

				// People.insert(person);
				
			});

			return JSON.stringify(test);		
		}
	}
});
