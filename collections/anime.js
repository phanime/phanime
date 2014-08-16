Anime = new Meteor.Collection("anime", {
	transform: function(doc) {

		if (doc.coverImage) {
			doc.coverImageUrl = "http://cdn.phanime.com/images/anime/cover/" + doc.coverImage;
		} else {
			doc.coverImageUrl = 'na.gif';
		}

		return doc;
	}
});
