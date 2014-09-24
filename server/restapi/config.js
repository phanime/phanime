// Global configuration
RESTstop.configure({
	use_auth: true,
	api_path: 'api/v1',
	pretty_json: true,

});


restAPIHelpers = {
	allowedValues: {
		checkAnimeId: function(animeId) {
			if (Anime.findOne({_id: animeId})) {
				return true;
			} else {
				return false;
			}
		},
		checkUniqueEntry: function(animeId, userId) {
			if (LibraryEntries.findOne({userId: userId, animeId: animeId})) {
				return false;
			} else {
				return true;
			}
		},
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
				return seen % 1 === 0 && seen >= 1 && seen <= total;
			} else {
				return seen % 1 === 0 && seen >= 1;
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
	},
	schemaCheck: {
		libraryEntries: function(entry) {
			var fields = ['_id', 'userId', 'animeId', 'status', 'comments', 'rating', 'episodesSeen', 'privacy', 'highPriority', 'rewatching', 'updatedAt', 'createdAt'];

			for (var key in entry) {
				if (fields.indexOf(key) === -1) {
					return false;
				} 
			}

			return true;


		}
	},
	returns: {
		invalidInput: function() {
			return [400, {
				success: 'false',
				message: 'Invalid input'
			}];
		},
		notUnique: function() {
			return [400, {
				success: 'false',
				message: 'Resource not unique'
			}];			
		}
	}
};