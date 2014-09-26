Template.index.seasonImage = function() {
	var current_season;
	var current_month = moment().format("MM");
	if (current_month >= "03" && current_month <= "05") {
		current_season = "Spring";
	} else if (current_month >= "06" && current_month <= "08") {
		current_season = "Summer";
	} else if (current_month >= "09" && current_month <= "11") {
		current_season = "Fall";
	} else {
		current_season = "Winter";
	}


	if (current_season === 'Spring') {
		return  "spring.jpg";
	} else if (current_season === 'Summer') {
		return "summer.jpg";
	} else if (current_season === 'Fall') {
		return "fall.jpg";
	} else {
		return "winter.jpg";
	}
};
	
Template.index.currentSeason = function() {
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
};

Template.index.currentYear = function() {
	var current_year = moment().format('YYYY');
	return current_year;
};

Template.index.events({

	'click #requestRecommendation' : function(event, template) {

		// We should hide the button until the recommendations are generated
		$('#requestRecommendation').css('display', 'none');
		console.log('recommendations started');

		Meteor.call('generateAnimeRecommendations', Meteor.userId(), function(error, results) {
			if (!error) {
				console.log('recommendations finished');
			}
			// We can now show the button
			$('#requestRecommendation').css('display', '');
		});

	}


});