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
		optional: true
	},
	"entries.$.contentId": {
		type: String
		// Can't really do a check at the moment
	},
	"entries.$.sortOrder": {
		type: Number,
		min: 1,
		max: 100, // This max should match with the entries maxCount
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