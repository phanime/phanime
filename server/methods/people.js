Meteor.methods({
	createPerson: function(person) {
		
		// Ensure integerity of data
		check(person, PeopleSchema);


		// Generate auto values
		person.createdAt = new Date();

		// Insert the document into the database
		People.insert(person, function(error, _id) {
			console.log(_id);
		});

		console.log(person);
	}
});