// AnimeExploreController = RouteController.extend({
	
// 	onBeforeAction: function () {
// 			SEO.set({
// 				title: "Explore Anime | Phanime",
// 				meta: {
// 					'description' : 'Explore anime like never before on phanime'
// 				}
// 			});
// 	},

// 	// onAfterAction: function () {
// 	// },

// 	waitOn: function () {
// 		return Meteor.subscribe('animes');
// 	},

// 	data: function () {
// 		return Anime.find({}, {sort: {canonicalTitle: 1}});
// 	}

// });