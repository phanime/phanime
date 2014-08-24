Meteor.methods({
    createCharacter: function(character) {

    	// Ensure integerity of data
    	check(character, CharactersSchema);

    	// Generate auto values 
		character.createdAt = new Date();

		// Insert the document into the database
		// Characters.insert(character, function(error, _id) {
		// 	console.log(_id);
		// });

		console.log(character);


    }
});