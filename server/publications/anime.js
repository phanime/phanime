////////////////////////////////////////
// Return a specific anime collection //
////////////////////////////////////////


// Return anime by it's _id, no related data included
Meteor.publish("animeById", function(animeId) {
	return Anime.find({_id: animeId});
});


// Return anime by it's slug with all related anime data

Meteor.publish("animeBySlug", function(animeSlug) {
	return Anime.find({slug: animeSlug});
});