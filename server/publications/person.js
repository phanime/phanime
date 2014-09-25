// Publish specific person by ID

Meteor.publishComposite("person", function(personId) {

	return {
		find: function() {
			return People.find({_id: personId});
		},
		children: [
			{
				find: function(person) {
					return Castings.find({personId: person._id});
				},
				children: [
					{
						find: function(casting, person) {
							return Anime.find({_id: casting.animeId}, {fields: requireCollectionFields.anime.imageAndTitle});
						}
					},
					{
						find: function(casting, person) {
							return Characters.find({_id: casting.characterId}, {fields: requireCollectionFields.character.imageAndName});
						}
					}
				]  
			}
		]
	};
});