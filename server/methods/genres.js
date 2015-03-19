Meteor.methods({

	getGenres: function() {
		return Genres.find({}, {sort: {name: 1}}).fetch();
	}

});
