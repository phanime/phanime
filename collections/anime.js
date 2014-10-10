Anime = new Meteor.Collection("anime");

Anime.helpers({

	coverImageUrl: function() {
		// If revisionId exists then we're using the new upload system
		// so we should use animeId in the url

		console.log("http://cdn.phanime.com/images/anime/cover/" + this._id  + "/" + this.coverImage);
		console.log(this.newImageURLFormat);

		if (this.newImageURLFormat) {
			if (this.coverImage) {
				console.log("got here");
				console.log("http://cdn.phanime.com/images/anime/cover/" + this._id  + "/" + this.coverImage);
				return "http://cdn.phanime.com/images/anime/cover/" + this._id  + "/" + this.coverImage;
			} else {
				return "http://cdn.phanime.com/images/site/na.gif";
			}
		} else {
			if (this.coverImage) {
				return "http://cdn.phanime.com/images/anime/cover/" + this.coverImage;
			} else {
				return "http://cdn.phanime.com/images/site/na.gif";
			}
		}		
	},
	title: function() {
		// For the time being we just choose
		// the standard title
		return this.canonicalTitle;
	},
	libraryEntry: function() {
		return LibraryEntries.findOne({animeId: this._id, userId: Meteor.userId()});
	}

});

EasySearch.createSearchIndex('anime', {
	'use' : 'mongo-db',
	'field' : ['canonicalTitle', 'englishTitle', 'romajiTitle', 'titleSynonyms'],
	'collection' : Anime,
	'limit' : 20,
	'query' : function(searchString) {
		var query = EasySearch.getSearcher('mongo-db').defaultQuery(this, searchString);
		return query;
	},
	'changeResults' : function (results) {
		// We should attach libraryEntries to anime if the user exists

		if (Meteor.userId()) {
			results.results.forEach(function(anime) {
				anime.libraryEntry = LibraryEntries.findOne({userId: Meteor.userId(), animeId: anime._id});
			});
		}

		return results;
	}
});

AnimePages = new Meteor.Pagination(Anime, {
	router: 'iron-router',
	routerTemplate: 'animeExplore',
	homeRoute: '/anime/explore/',
	route: '/anime/explore/page/',
	perPage: 30,
	itemTemplate: 'animeCardProxy',
	routerLayout: 'defaultLayout',
	sort: {canonicalTitle: 1},
	templateName: 'animeSpecificExplore',
	/*infiniteItemsLimit: 30,*/

});


Anime.createAnimeObject = function(anime) {

	// We're just going to add some default fields 
	anime.createdAt = new Date();
	anime.updatedAt = new Date();
	anime.slug = getSlug(anime.canonicalTitle);

	return anime;

}

Anime.allow({

	insert: function(userId, doc) {
		
		// We need to ensure that there is only one anime per canonicalTitle 
		var titleCheck = Anime.findOne({canonicalTitle: doc.canonicalTitle});
		var slugCheck = Anime.findOne({slug: doc.slug});

		var uniqueCondition;

		// console.log(titleCheck);
		// console.log(slugCheck);

		if (titleCheck || slugCheck) {
			uniqueCondition = false;
		} else {
			uniqueCondition = true;
		}

		return uniqueCondition;

	},
	// update: function(userId, doc, fields, modifier) {

	// 	// can only change your own library entries
	// 	return doc.userId === userId;

	// },
	// remove: function(userId, doc) {

	// 	// can only remove entries that you own
	// 	return doc.userId === userId;

	// }


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
		autoform: {
			disabled: true,
			value: null			
		},
		optional: true,
	},
	coverImage: {
		type: String,
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
	themes: {
		type: [String]
	},
	studios: {
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


AnimeRevisionsSchema = new SimpleSchema({
	_id: {
		type: String,
		optional: true
	},
	revisionId: {
		type: String,
		label: '',
		optional: true
	},
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
		autoform: {
			disabled: true,
			value: null			
		},
		optional: true,
	},
	coverImage: {
		type: String,
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
		},
		optional: true
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
	themes: {
		type: [String],
		optional: true
	},
	studios: {
		type: [String],
		optional: true
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
	},
	myAnimeListId: {
		type: String,
		label: "MyAnimeList ID",
		optional: true
	},
	animeNewsNetworkId: {
		type: String,
		label: "AnimeNewsNetwork ID",
		optional: true
	},
	anidbId: {
		type: String,
		label: "aniDB ID",
		optional: true
	}
});