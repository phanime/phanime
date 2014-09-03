Template.landing.rendered = function() {
	// $('.bg').blurjs({
	// 	source: 'body',
	// 	radius: 30,
	// 	overlay: 'rgba(0,0,0,0.2)'
	// });
}


Template.landing.landingImage = function() {

		var gifs = [
			"http://25.media.tumblr.com/6f70d7604b667b5b03700457ebe57df3/tumblr_mhi5buozb81qf8isso1_500.gif",
			"http://24.media.tumblr.com/d3aa208c3d135fc4cbdc1d4b469a4c8f/tumblr_mwadwrdFWB1qztgoio1_500.gif",
			"http://media2.giphy.com/media/fm6xxZHgHLwxa/giphy.gif",
			"http://media0.giphy.com/media/ZOGCyj0NW28gg/giphy.gif",
			"http://media.giphy.com/media/zHGXhFJCVCbD2/giphy.gif",
			"http://31.media.tumblr.com/tumblr_m3q9vmuqGg1rozgayo1_500.gif",
			"http://media-cache-ec0.pinimg.com/originals/13/9f/f5/139ff545b37593fcff57c0c9f676de17.jpg",
			"http://media.giphy.com/media/13LQZoCE0Nysr6/giphy.gif",
			"http://static.tumblr.com/qmeablg/6JAlyn4op/tumblr_layytg8cqf1qc2jhfo1_500.gif",
			"http://media-cache-ec0.pinimg.com/originals/68/0b/69/680b69563aceba3df48b4483d007bce3.jpg",
			"http://media.giphy.com/media/VUC9YdLSnKuJy/giphy.gif",
			"http://media.giphy.com/media/OaHp43V1N4OvC/giphy.gif",
			"http://data.whicdn.com/images/19521764/tumblr_luch96ogPv1qemssho1_500_large.gif",
			"http://24.media.tumblr.com/f66cf98b45010359bea6ed008ffcd614/tumblr_n5eyqwMG1q1sf5vppo1_500.gif",
			"http://i.imgur.com/6mOAx9v.gif",
		];

		var randGif = gifs[Math.floor(Math.random() * gifs.length)];

		return randGif;
}


