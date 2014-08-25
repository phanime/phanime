////////////////////////////////////////
// Return a specific anime collection //
////////////////////////////////////////


// Return anime by it's _id, no related data included
Meteor.publish("animeById", function(animeId) {
	return {
		find: function() {
			return Anime.find({slug: animeId});
		},
		children: [
			{
				find: function(anime) {
					return Episodes.find({animeId: anime._id});
				} 
			},
			{
				find: function(anime) {
					return Castings.find({animeId: anime._id});
				},
				children: [
					{
						find: function(casting, anime) {
							return Characters.find({_id: casting.characterId});
						}
					},
					{
						find: function(casting, anime) {
							return People.find({_id: casting.personId});
						}
					}
				]  
			},
			{
				find: function(anime) {
					return StaffMembers.find({animeId: anime._id});
				},
				children: [
					{
						find: function(staffMember, anime) {
							return People.find({_id: staffMember.personId});
						}
					}
				] 
			},
			{
				find: function(anime) {
					return LibraryEntries.find({animeId: anime._id, userId: this.userId});
				}
			}

		]
	};
});

Meteor.publishComposite("animeBySlug", function(animeSlug) {

	return {
		find: function() {
			return Anime.find({slug: animeSlug});
		},
		children: [
			{
				find: function(anime) {
					return Episodes.find({animeId: anime._id});
				} 
			},
			{
				find: function(anime) {
					return Castings.find({animeId: anime._id});
				},
				children: [
					{
						find: function(casting, anime) {
							return Characters.find({_id: casting.characterId});
						}
					},
					{
						find: function(casting, anime) {
							return People.find({_id: casting.personId});
						}
					}
				]  
			},
			{
				find: function(anime) {
					return StaffMembers.find({animeId: anime._id});
				},
				children: [
					{
						find: function(staffMember, anime) {
							return People.find({_id: staffMember.personId});
						}
					}
				] 
			},
			{
				find: function(anime) {
					return LibraryEntries.find({animeId: anime._id, userId: this.userId});
				}
			}

		]
	};
});