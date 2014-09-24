// Global configuration
RESTstop.configure({
	use_auth: true,
	api_path: 'api/v1',
	pretty_json: true,

});


restAPIHelpers = {
	allowedValues: {
		checkStatus: function(status) {
			return ['Watching', 'Completed', 'Plan to watch', 'On hold', 'Dropped'].indexOf(status) > -1;
		},
 
		checkComments: function(comments) {
			return comments.length <= 140;
		}, 

		checkRating: function(rating) {
			return rating % 1 === 0 && rating >= 1 && rating <= 10;
		},

		checkEpisodesSeen: function(seen, total) {
			if (total) {
				return seen >= 1 && seen <= total;
			} else {
				return seen >= 1;
			}
		},

		checkPrivacy: function(privacy) {
			return privacy == 'true' || privacy == 'false';
		},

		checkHighPriority: function(highPriority) {
			return highPriority == 'true' || highPriority == 'false';
		},

		checkRewatching: function(rewatching) {
			return rewatching == 'true' || rewatching == 'false';
		}
	}
};