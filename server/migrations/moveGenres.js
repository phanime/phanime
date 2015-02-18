// Migrations.add({
// 	version: 1,
// 	up: function() {
// 		var genres = Genres.find().fetch();
// 		var notGenres = [
// 			"Cars",
// 			"Demons",
// 			"Drama",
// 			"Ecchi",
// 			"Game",
// 			"Harem",
// 			"Magic",
// 			"Magical",
// 			"Martial Arts",
// 			"Mecha",
// 			"Military",
// 			"Music",
// 			"Samurai",
// 			"School Life",
// 			"Space",
// 			"Sports",
// 			"Super Power",
// 			"Supernatural",
// 			"Vampire"
// 		];
// 		genres = _.pluck(genres, 'name');
// 		Anime.find({}).forEach(function(anime) {
//
// 		});
// 	}
// });
//
//
// db.anime.find({genres: {$exists: true}}).forEach(function(anime) {
// 	var genres = db.genres.find({}, {name: 1, _id: 0}).toArray().map(function(genres) {
// 		return genres.name;
// 	});
//
// 	if (anime.genres) {
// 		anime.genres.forEach(function(genre) {
// 			if (genres.indexOf(genre) === -1) {
// 				print (anime.canonicalTitle + ":" + anime._id + " doesn't exist: " + genre);
// 			}
// 		});
//
// 		// print (anime.canonicalTitle + " doesn't have bad genres");
// 	}
// });
//
// // Trimms all the anime genres
//
// db.anime.find({genres: {$exists: true}}).forEach(function(anime) {
// 	if (anime._id === "Xe3oDXA23yfAGWKNy") {
// 		print (anime.genres);
// 	}
// 	var trimmedGenres = anime.genres.map(function(genre) {
// 		return genre.trim();
// 	});
//
// 	db.anime.update({_id: anime._id}, {$set: {genres: trimmedGenres}});
//
// });
//
// // Change Demon to Demons
// db.anime.find({genres: {$exists: true}}).forEach(function(anime) {
//
// 	var index = anime.genres.indexOf("Demon");
//
// 	if (index > -1) {
// 		anime.genres[index] = "Demons";
// 		print (anime.genres);
// 		db.anime.update({_id: anime._id}, {$set: {genres: anime.genres}});
// 	}
//
// });
//
//
// // Moving Police to Crime
// db.anime.update({genres: {$in: ["Police"]}}, {$push: {genres: "Crime"}}, {multi: true})
//
// // Moving Dementia to Paranoid
// db.anime.update({genres: {$in: ["Dementia"]}}, {$push: {genres: "Paranoid"}}, {multi: true})
// db.anime.update({genres: {$in: ["Paranoid"]}}, {$pull: {genres: "Dementia"}}, {multi: true})
//
// // Change School to School Life
// db.anime.find({genres: {$exists: true}}).forEach(function(anime) {
//
// 	var index = anime.genres.indexOf("School");
//
// 	if (index > -1) {
// 		anime.genres[index] = "School Life";
// 		print (anime.genres);
// 		db.anime.update({_id: anime._id}, {$set: {genres: anime.genres}});
// 	}
//
// });
//
// // Move all themes back to genres
// db.anime.find({themes: {$exists: true}}).forEach(function(anime) {
// 	var genres = anime.genres;
// 	var themes = anime.themes;
//
// 	themes.forEach(function(theme) {
// 		if (genres.indexOf(theme) === -1) {
// 			print("this theme doesn't exist in genres");
// 		}
// 	});
// });
//
// // Move specified genres to themes
// db.anime.find({genres: {$exists: true}}).forEach(function(anime) {
//
// 	var notGenres = [
// 		"Cars",
// 		"Demons",
// 		"Drama",
// 		"Ecchi",
// 		"Game",
// 		"Harem",
// 		"Magic",
// 		"Magical",
// 		"Martial Arts",
// 		"Mecha",
// 		"Military",
// 		"Music",
// 		"Samurai",
// 		"School Life",
// 		"Space",
// 		"Sports",
// 		"Super Power",
// 		"Supernatural",
// 		"Vampire"
// 	];
//
// 	var themes = [];
//
// 	if (anime.genres) {
// 		var currentGenres = anime.genres;
// 		var newGenres = [];
// 		currentGenres.forEach(function(genre, index) {
// 			if (notGenres.indexOf(genre) !== -1) {
// 				themes.push(genre);
// 			} else {
// 				newGenres.push(genre);
// 			}
// 		});
// 		print (anime.canonicalTitle + ":" + anime._id);
// 		print ("New Genres");
// 		print (newGenres);
// 		print ("New Themes");
// 		print (themes);
//
// 		var setObj = {genres: newGenres};
// 		if (themes.length > 0) {
// 			setObj.themes = themes;
// 		}
//
// 		db.anime.update({_id: anime._id}, {$set: setObj});
// 	}
//
// });
//
//
// // Move all homosexual genres to the Homosexual theme
// db.anime.find({genres: {$exists: true}}).forEach(function(anime) {
//
// 	var homoGenres = [
// 		"Yaoi",
// 		"Yuri",
// 		"Shounen Ai"
// 	];
//
// 	var homo = false;
//
// 	if (anime.genres) {
// 		var currentGenres = anime.genres;
// 		var pullGenres = [];
// 		anime.genres.forEach(function(genre, index) {
// 			if (homoGenres.indexOf(genre) !== -1) {
// 				homo = true;
// 				pullGenres.push(genre);
// 			}
// 		});
//
// 		if (homo) {
// 			print (anime.canonicalTitle + ":" + anime._id);
// 			print("Genres being removed");
// 			print (pullGenres);
//
// 			db.anime.update({_id: anime._id}, {$pullAll: {genres: pullGenres}, $push: {themes: "Homosexual"}})
// 		}
// 	}
//
// });
//
// // Move Swordplay genre to theme
// db.anime.update({genres: {$in: ["Swordplay"]}}, {$pull: {genres: "Swordplay"}, $push: {themes: "Swordplay"}});
//
// // Remove target audiences from anime
// db.anime.find({genres: {$in: [
// 	"Josei",
// 	"Kids",
// 	"Seinen",
// 	"Shoujo",
// 	"Shounen",
// 	"Children's Show"
// ]}}).forEach(function(anime) {
//
// 	var target = [
// 		"Josei",
// 		"Kids",
// 		"Seinen",
// 		"Shoujo",
// 		"Shounen",
// 		"Children's Show"
// 	];
//
// 	var tar = false;
//
// 	if (anime.genres) {
// 		var pullGenres = [];
// 		anime.genres.forEach(function(genre, index) {
// 			if (target.indexOf(genre) !== -1) {
// 				tar = true;
// 				pullGenres.push(genre);
// 			}
// 		});
//
// 		if (tar) {
// 			print (anime.canonicalTitle + ":" + anime._id);
// 			print("Genres being removed");
// 			print (pullGenres);
//
// 			db.anime.update({_id: anime._id}, {$pullAll: {genres: pullGenres}});
// 		}
// 	}
//
// });
//
// // Remove the genres that are now themes
// db.genres.remove({name: {$in: [
// 	"Cars",
// 	"Demons",
// 	"Drama",
// 	"Ecchi",
// 	"Game",
// 	"Harem",
// 	"Magic",
// 	"Magical",
// 	"Martial Arts",
// 	"Mecha",
// 	"Military",
// 	"Music",
// 	"Samurai",
// 	"School Life",
// 	"Space",
// 	"Sports",
// 	"Super Power",
// 	"Supernatural",
// 	"Vampire"
// 	]}})
//
// // Remove target audiences
// db.genres.remove({name: {$in: [
// 	"Josei",
// 	"Kids",
// 	"Seinen",
// 	"Shoujo",
// 	"Shounen",
// 	"Children's Show"
// ]}})
//
//
//
//
// // Final list of themes
// db.anime.find({themes: {$exists: true, $nin: [
// 	"Cars",
// 	"Demons",
// 	"Drama",
// 	"Ecchi",
// 	"Game",
// 	"Harem",
// 	"Homosexual",
// 	"Magic",
// 	"Magical",
// 	"Martial Arts",
// 	"Mecha",
// 	"Military",
// 	"Music",
// 	"Samurai",
// 	"School Life",
// 	"Space",
// 	"Sports",
// 	"Super Power",
// 	"Supernatural",
// 	"Swordplay",
// 	"Vampire"
// ]}}, {themes: 1});
