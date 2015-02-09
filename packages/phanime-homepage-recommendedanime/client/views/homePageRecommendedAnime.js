Template.homePageRecommendedAnime.created = function() {
	var self = this;
	self.ready = new ReactiveVar(false);
	self.recommendedAnime = new ReactiveVar();

	var subscription = Meteor.subscribe("homePageRecommendedAnime");

	self.autorun(function() {
		if (subscription.ready()) {
			self.ready.set(true);
			var animeIds = _.pluck(Meteor.user().recommendedAnime, "animeId");
			var cursor = Anime.find({_id: {$in: animeIds}}, {limit: 12});
			self.recommendedAnime.set(cursor);
		} else {
			self.ready.set(false);
		}
	});
};

Template.homePageRecommendedAnime.events({

	'click #requestRecommendation' : function(event, template) {

		// We should hide the button until the recommendations are generated
		$('#requestRecommendation').attr('id', 'loading');
		$('#loading').text('Loading...');

		Meteor.call('generateAnimeRecommendations', Meteor.userId(), function(error, results) {
			if (!error) {
				console.log('recommendations finished');
			} else {
				console.log(error);
			}
			// We change the button back
			$('#loading').attr('id', 'requestRecommendation');
			$('#requestRecommendation').text('Request Recommendations');
		});

	}


});

Template.homePageRecommendedAnime.helpers({

	isReady: function() {
		return Template.instance().ready.get();
	},

	recommendedAnime: function() {
		var recommendedAnime = Template.instance().recommendedAnime.get();
		return recommendedAnime;
	}
});