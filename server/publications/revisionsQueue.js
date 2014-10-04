Meteor.publishComposite("revisionsQueue", function() {

	return {
		find: function() {
			return Revisions.find();
		},
		// children: [
		// 	{
		// 		find: function(anime) {
		// 			return Episodes.find({animeId: anime._id});
		// 		} 
		// 	},
		// 	{
		// 		find: function(anime) {
		// 			return Castings.find({animeId: anime._id});
		// 		},
		// 		children: [
		// 			{
		// 				find: function(casting, anime) {
		// 					return Characters.find({_id: casting.characterId});
		// 				}
		// 			},
		// 			{
		// 				find: function(casting, anime) {
		// 					return People.find({_id: casting.personId});
		// 				}
		// 			}
		// 		]  
		// 	},
		// 	{
		// 		find: function(anime) {
		// 			return StaffMembers.find({animeId: anime._id});
		// 		},
		// 		children: [
		// 			{
		// 				find: function(staffMember, anime) {
		// 					return People.find({_id: staffMember.personId});
		// 				}
		// 			}
		// 		] 
		// 	},
		// 	{
		// 		find: function(anime) {
		// 			return LibraryEntries.find({animeId: anime._id, userId: this.userId});
		// 		}
		// 	},
		// 	{
		// 		find: function(anime) {
		// 			return Reviews.find({animeId: anime._id});
		// 		}
		// 	}

		// ]
	};
});