Template.anime.rendered = function() {
	// Make a call to anime ratings calculator 
	// We should limit this maybe, every 24 hours 
	// using ratingUpdatedAt field. However, best 
	// to do this in a node job
	// Meteor.call('calculateAnimeRatingById', this.data._id, function(error, result) {
	// 	console.log(error);
	// 	console.log(result);
	// });

	$('.block.scroll-ready').mCustomScrollbar({
		theme: 'dark',
		scrollButtons: {
			enable: true
		}
	});

};


Template.anime.airingText = function() {


	if (this.startDate !== undefined && this.endDate !== undefined && moment(this.startDate).year() && moment(this.endDate).year()) {
	
		// Both dates are defined, now we just need to figure out if the anime is airing / going to air / finished airing

		// Currently airing
		if (moment().isAfter(this.startDate) && moment().isBefore(this.endDate)) {
			return "Airing from";
		} else if (moment().isBefore(this.startDate)) {
			return "Will air from ";
		} else if (moment().isAfter(this.endDate)) {
			return "Aired from";
		}

	} else if (!moment(this.endDate).year() || this.endDate === undefined) {

		// Now we should check if there is a this.endDate field and if it's just not null
		if (this.endDate) {
			return "Aired from";
		} else {
			return "Aired on";
		}

	}

};

Template.anime.destroyed = function() {
	$('.block.scroll-ready').mCustomScrollbar('destroy');
};