// Helpers to determine the fields we need when publishing
requireCollectionFields = {
	
	anime: {
		imageAndTitle: {slug: 1, coverImage: 1, canonicalTitle: 1, englishTitle: 1, romajiTitle: 1},
		requiredLibraryEntry: {slug: 1, coverImage: 1, canonicalTitle: 1, englishTitle: 1, romajiTitle: 1, totalEpisodes: 1}
	},
	person: {
		imageAndName: {coverImage: 1, firstName: 1, lastName: 1}
	},
	character: {
		imageAndName: {coverImage: 1, firstName: 1, lastName: 1}
	},


};