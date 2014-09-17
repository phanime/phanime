// HTTP.methods({
// 	'api/v1/castings': {
// 		get: function(data) {
// 			this.setContentType('application/json');
// 			var castings = Castings.find();
// 			var test = [];
// 			castings.forEach(function(casting) {


// 				test.push(casting);


// 				// // Third Time
// 				//delete casting.characterIdOld;

// 				// // Second Time 
// 				// var character = Characters.findOne({id: casting.characterIdOld});

// 				// if (character)
// 				// 	casting.characterId = character._id;

// 				// // Remove old ids
// 				// delete casting.personIdOld;
// 				// delete casting.animeIdOld;

// 				//console.log(character._id);

// 				// First time

// 				// // Find all the related data
// 				// var anime = Anime.findOne({id: casting.animeIdOld});
// 				// var person = People.findOne({id: casting.personIdOld});
// 				// //var character = Characters.findOne({id: casting.characterIdOld});

// 				// //casting.character = character;

// 				// // Add new ids
// 				// casting.animeId = anime._id;
// 				// casting.personId = person._id;
// 				// //casting.characterId = character._id;


// 				// // Delete the old one and insert a new one
// 				// Castings.remove(casting._id);
				
// 				// // delete casting._id;
// 				// // casting.createdAt = new Date();
// 				// // casting.updatedAt = new Date();

// 				// Castings.insert(casting);
				
// 			});

// 			return JSON.stringify(test);		
// 		}
// 	}
// });
