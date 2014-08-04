import Ember from 'ember';

export default Ember.ArrayController.extend({

	season_image: function() {
		var current_season = this.get('current_season');


		if (current_season === 'Spring') {
			return this.get('settings.siteWallpapers') + "spring.jpg";
		} else if (current_season === 'Summer') {
			return this.get('settings.siteWallpapers') + "summer.jpg";
		} else if (current_season === 'Fall') {
			return this.get('settings.siteWallpapers') + "fall.jpg";
		} else {
			return this.get('settings.siteWallpapers') + "winter.jpg";
		}
	}.property('current_season'),
	
	current_season: function() {
		var current_month = moment().format("MM");
		if (current_month >= "03" && current_month <= "05") {
			return "Spring";
		} else if (current_month >= "06" && current_month <= "08") {
			return "Summer";
		} else if (current_month >= "09" && current_month <= "11") {
			return "Fall";
		} else {
			return "Winter";
		}
	}.property(),

	current_year: function() {
		var current_year = moment().format('YYYY');
		return current_year;
	}.property(),

});
