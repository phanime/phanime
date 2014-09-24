//////////////////////////////////////////////
////////////// GET specific by ID ////////////
//////////////////////////////////////////////

// maps to: /api/v1/resource/:id

RESTstop.add('anime/:_id', { require_login: true, method: 'GET' }, function() {

	// Grab a specific anime

	return {anime: Anime.findOne({_id: this.params._id})};

});

///////////////////////////////////////////////
///////////// ANIME SEARCH ////////////////////
///////////////////////////////////////////////

// RESTstop.add('anime', { require_login: true, method: 'GET' }, function() {

// 	if (this.params.query === '') {
// 		return restAPIHelpers.returns.invalidInput();
// 	} 

// 	EasySearch.search('anime',  this.params.query, {
// 		'limit' : 10, // override the 20, defined in createSearchIndex
// 		'field' : 'canonicalTitle' // also only search for names
// 	});

// 	// return {anime: Anime.findOne({_id: this.params._id})};

// });
