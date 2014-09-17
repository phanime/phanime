// HTTP.methods({
// 	'api/v1/anime': {
// 		get: function(data) {
// 			this.setContentType('application/json');
// 			var anime = Anime.find();
// 			var test = [];
// 			anime.forEach(function(anime) {

// 				// Anime.update({_id: anime._id}, {$unset: {coverImageUrl: ""}});

// 				test.push(anime);

// 				// Delete the old one and insert a new one (for now we'll just insert);
// 				// Anime.remove(anime._id);
				
// 				// delete anime._id;
// 				// anime.createdAt = new Date();
// 				// anime.updatedAt = new Date();

// 				// Anime.insert(anime);
				
// 			});

// 			Email.send({
// 				to: 'maazali40@gmail.com',
// 				from: 'no-reply@phanime.com',
// 				subject: 'Welcome to Phanime',
// 				html: '<b>This is html</b> That should work',
// 				text: 'or normal text I suppose?'
// 			});

// 			console.log('Email sent?');

// 			return JSON.stringify(test);		
// 		}
// 	}
// });
