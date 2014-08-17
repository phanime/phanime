////////////////////////////////////////
// Return a specific anime collection //
////////////////////////////////////////


// Return anime by it's _id, no related data included
Meteor.publish("animeById", function(animeId) {
	return [
		Anime.findOne({_id: animeId}),
		Episodes.find({animeId: animeId})
	];
});


// Return anime by it's slug with all related anime data

Meteor.publish("animeBySlug", function(animeSlug) {
	var anime = Anime.findOne({slug: animeSlug});
	//var castings = Castings.find({animeId: anime._id});

	// Get characters

	return [
		Anime.find({slug: animeSlug}),
		Episodes.find({animeId: anime._id}),
		Castings.find({animeId: anime._id})
		LibraryEntries.findOne({animeId: anime._id, userId: this.userId})
	];
});