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
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();
			}
		},
		denyUpdate: true,
		optional: true // this is only made optional because validation before insert will not work if it was required, however, this does not make much of a difference as the createdAt value will still be generated on insert.
	},
	updatedAt: {
		type: Date,
		autoValue: function() {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true // this is only made optional because validation before insert will not work if it was required, however, this does not make much of a difference as the value will still be generated on update.
	}
});

Genres.attachSchema(GenresSchema);
