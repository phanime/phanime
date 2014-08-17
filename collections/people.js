People = new Meteor.Collection("people", {
	transform: function(doc) {

		if (doc.coverImage) {
			doc.coverImageUrl = "http://cdn.phanime.com/images/people/cover/" + doc.coverImage;
		} else {
			doc.coverImageUrl = 'na.gif';
		}

		return doc;
	}
});
