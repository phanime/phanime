// Hacky way of getting around iron-router's pathFor helper
Template.reviewCard.urlObject = function() {
	var review = Template.instance().data;
	var anime = Anime.findOne({_id: review.animeId});

	return {
		slug: anime.slug,
		_id: review._id
	};

};