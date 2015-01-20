Meteor.methods({
	
	getGenres: function() {
		return Genres.find().fetch();
	}

});