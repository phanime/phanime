Template.anime.rendered = function() {

	$('.block.scroll-ready').mCustomScrollbar({
		theme: 'dark',
		scrollButtons: {
			enable: true
		}
	});

};

Template.anime.destroyed = function() {
	$('.block.scroll-ready').mCustomScrollbar('destroy');
};


Template.anime.helpers({
	airingText: function() {
		// We should check if startDate is equal to endDate
		if (this.startDate !== undefined && this.endDate !== undefined && this.startDate === this.endDate) {
			return "Aired on";
		} else if (this.startDate !== undefined && this.endDate !== undefined && moment(this.startDate).year() && moment(this.endDate).year()) {
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
	}
});
