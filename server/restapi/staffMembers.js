// HTTP.methods({
// 	'api/v1/staffMembers': {
// 		get: function(data) {
// 			this.setContentType('application/json');
// 			var staffMembers = StaffMembers.find();
// 			var test = [];
// 			staffMembers.forEach(function(staffMember) {


// 				test.push(staffMember);


// 				// // SECOND RUN 
// 				// delete staffMember.animeIdOld;
// 				// delete staffMember.personIdOld;

// 				// First RUN
// 				// var anime = Anime.findOne({id: staffMember.animeIdOld});
// 				// var person = People.findOne({id: staffMember.personIdOld});

// 				// if (anime)
// 				// 	staffMember.animeId = anime._id;

// 				// if (person)
// 				// 	staffMember.personId = person._id;

// 				// // Delete the old one and insert a new one
// 				// StaffMembers.remove(staffMember._id);
				
// 				// delete staffMember._id;
// 				// staffMember.createdAt = new Date();
// 				// staffMember.updatedAt = new Date();

// 				// StaffMembers.insert(staffMember);
				
// 			});

// 			return JSON.stringify(test);		
// 		}
// 	}
// });
