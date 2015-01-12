CustomLists = new Meteor.Collection("customLists");

CustomListsSchema = new SimpleSchema({
	type: {
		type: String,
		allowedValues: ['anime', 'manga', 'characters', 'people']
	},
	title: {
		type: String,
		min: 1,
		max: 100 // Not sure what we should set as a hard limit
	},
	userId: {
		type: String,
		custom: function() {
			// Check that a user from this ID actually exists
			if (!Meteor.users.findOne({_id: this.value})) {
				return "No user found with this userId";
			}
		},
		denyUpdate: true
	},
	slug: {
		type: String,
		autoValue: function() {
			var title;
			if (this.isUpdate) {
				title = CustomLists.findOne({_id: this.docId}).title;
			} else {
				title = this.field("title").value;
			}

			return getSlug(title);
		}
	},
	description: {
		type: String,
		min: 1,
		max: 500,
		optional: true
	},
	entries: {
		type: [Object],
		maxCount: 100, // We may need more then this... Any limit that we have should be a strict one (We want to keep the documents small in size)
		// optional: true,
		custom: function() {
			// We want to ensure each object within this array is unique, we'll ensure this by
			// ensuring the contentId of each object is unique with respect to this array
			// we essentially want entries to act like a set.

			return this.value !== _.uniq(this.value) ? 1 : "Duplicate entries found";
		}
	},
	"entries.$.contentId": {
		type: String
		// Can't really do a check at the moment
	},
	"entries.$.sortOrder": {
		type: Number,
		min: 0,
		max: 99, // This max should be 1 less than the entries maxCount
	},
	"entries.$.comment": {
		type: String,
		min: 1,
		max: 500,
		optional: true
	},
	privacy: {
		type: Boolean,
		optional: true
	},
	disableComments: {
		type: Boolean,
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
			//  else if ((this.value === null || this.value === undefined) && !this.isUpdate) {
			// 	// this is more for the times where validation needs to happen without "inserting"
			// 	return new Date();
			// }
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
		optional: true
	}
});


CustomLists.attachSchema(CustomListsSchema);


CustomLists.allow({

	insert: function(userId, customList) {
		// the user must be logged in, and the custom list must be created by the user
		return (userId && customList.userId === userId);
	},
	update: function(userId, customList, fields, modifier) {

		// can only change your own lists


		return (customList.userId === userId);

	},
	remove: function(userId, doc) {

		// can only remove lists that you own
		return doc.userId === userId;

	}
});


CustomLists.helpers({
	user: function() {
		return Meteor.users.findOne({_id: this.userId});
	},
	comments: function() {
		// We show the most recent comment at the top for now.
		return Comments.find({contentId: this._id, type: 'customList'}, {sort: {createdAt: -1}});
	},
	entriesWithContent: function() {
		// Let's grab all the id's
		var ids = _.pluck(this.entries, 'contentId');

		switch (this.type) {
			case "anime":
				var anime = Anime.find({_id: {$in: ids}}).fetch();
				var self = this;
				anime.forEach(function(anime) {
					self.entries.forEach(function(entry) {
						if(entry.contentId === anime._id) {
							entry.content = anime;
						}
					});
				});

				break;

			case "characters":
			 	var characters = Characters.find({_id: {$in: ids}});
				var self = this;
				characters.forEach(function(character) {
					self.entries.forEach(function(entry) {
						if(entry.contentId === character._id) {
							entry.content = character;
						}
					});
				});
				break;
			case "people":
				var people = People.find({_id: {$in: ids}});
				var self = this;
				people.forEach(function(person) {
					self.entries.forEach(function(entry) {
						if(entry.contentId === person._id) {
							entry.content = person;
						}
					});
				});
				break;
		}

		// The sorting is already done before we did a save, so we don't have to sort here;
		return this.entries;
	},
	isTypeAnime: function() {
		return this.type === "anime";
	},
	isTypeCharacters: function() {
		return this.type === 'characters';
	},
	isTypePeople: function() {
		return this.type === 'people';
	}
});
