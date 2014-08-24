Meteor.methods({
	createStudio: function(studio) {
		
		// Ensure integerity of data
		check(studio, StudiosSchema);


		// Generate auto values
		studio.slug = getSlug(studio.name);
		studio.createdAt = new Date();

		// Insert the document into the database
		Studios.insert(studio, function(error, _id) {
			console.log(_id);
		});

		console.log(studio);
	}
});