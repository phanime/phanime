// Publish a specific character by ID


Meteor.publishComposite("character", function(characterId) {

	return {
		find: function() {
			return Characters.find({_id: characterId});
		},
		children: [
			{
				find: function(character) {
					return Castings.find({characterId: character._id});
				},
				children: [
					{
						find: function(casting, character) {
							return Anime.find({_id: casting.animeId});
						}
					},
					{
						find: function(casting, character) {
							return People.find({_id: casting.personId});
						}
					}
				]  
			}
		]
	};
});