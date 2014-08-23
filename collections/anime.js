Anime = new Meteor.Collection("anime", {
	transform: function(doc) {

		if (doc.coverImage) {
			doc.coverImageUrl = "http://cdn.phanime.com/images/anime/cover/" + doc.coverImage;
		} else {
			doc.coverImageUrl = 'na.gif';
		}

		// Temporarily we'll just make title the canonicalTitle
		doc.title = doc.canonicalTitle;

		return doc;
	}
});


AnimeSchema = new SimpleSchema({
	canonicalTitle: {
		type: String,
		label: "Canonical Title",
	},
	romajiTitle: {
		type: String,
		label: "Romaji Title",
		optional: true,
	},
	englishTitle: {
		type: String,
		label: "English Title",
		optional: true,
	},
	japaneseTitle: {
		type: String,
		label: "Japanese Title",
		optional: true,
	},
	slug: {
		type: String,
		label: "Slug",
		optional: true,
		autoform: {
			disabled: true,
			value: 'Set automatically'			
		}
	},
	coverImage: {
		type: String,
		autoform: {
			disabled: true
		},
		optional: true,
	},
	bannerImage: {
		type: String,
		autoform: {
			disabled: true,
		},
		optional: true,
	},
	type: {
		type: String,
		allowedValues: [
			"TV",
			"OVA",
			"Movie",
			"Special",
			"ONA"
		],
		autoform: {
			firstOption: "Select Type of Anime"
		}
	},
	status: {
		type: String,
		allowedValues: [
			"On-going",
			"Complete",
			"Not Yet Aired"
		],
		autoform: {
			firstOption: "Select Anime Status"
		}
	},
	startDate: {
		type: Date,
		optional: true,
	},
	endDate: {
		type: Date,
		optional: true,
	},
	languageVersion: {
		type: [String],
		allowedValues: ["Subbed", "Dubbed"],
	},
	ageRating: {
		type: String,
		allowedValues: [
			"NR - Not Rated",
			"G - All Ages",
			"PG - Children",
			"PG-13 - Teens 13 or older",
			"R - 17+ (violence & profanity)",
			"R+ - Mild Nudity",
		],
		autoform: {
			firstOption: "Select Age Rating"
		}
	},
	genres: {
		type: [String]
	},
	seasonNumber: {
		type: Number,
		optional: true,
		min: 0,
	},
	totalEpisodes: {
		type: Number,
		optional: true,
		min: 0,
	},
	episodeDuration: {
		type: Number,
		optional: true,
		min: 0,
	},
	titleSynonyms: {
		type: String,
		optional: true,
		autoform: {
			rows: 5
		}
	},
	description: {
		type: String,
		optional: true,
		autoform: {
			rows: 10
		}
	}
});