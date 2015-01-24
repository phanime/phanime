Genres = new Meteor.Collection("genres");

GenresSchema = new SimpleSchema({
	name: {
		type: String
	},
	slug: {
		type: String,
		autoValue: function() {
			var name;

			if (this.isUpdate && !this.field("name").value) {
				name = Genres.findOne({_id: this.docId}).name;
			} else {
				name = this.field("name").value;
			}

			console.log(name);

			return getSlug(name);
		}
	},
	description: {
		type: String,
		optional: true
	}
});

Genres.attachSchema(GenresSchema);
