Template.landing.rendered = function() {

	$('.blur-image').spoilerAlert({max: 12, partial: 12, unspoil: false});

};

Template.landing.landingImage = function() {

		var gifs = [
			"http://25.media.tumblr.com/6f70d7604b667b5b03700457ebe57df3/tumblr_mhi5buozb81qf8isso1_500.gif",
			"http://24.media.tumblr.com/d3aa208c3d135fc4cbdc1d4b469a4c8f/tumblr_mwadwrdFWB1qztgoio1_500.gif",
			"http://media2.giphy.com/media/fm6xxZHgHLwxa/giphy.gif",
			"http://media0.giphy.com/media/ZOGCyj0NW28gg/giphy.gif",
			// "http://media.giphy.com/media/zHGXhFJCVCbD2/giphy.gif", // -- Girl Crying with her feet
			"http://31.media.tumblr.com/tumblr_m3q9vmuqGg1rozgayo1_500.gif",
			"http://media-cache-ec0.pinimg.com/originals/13/9f/f5/139ff545b37593fcff57c0c9f676de17.jpg",
			"http://media.giphy.com/media/13LQZoCE0Nysr6/giphy.gif",
			// "http://static.tumblr.com/qmeablg/6JAlyn4op/tumblr_layytg8cqf1qc2jhfo1_500.gif", -- Too much movement (pikachu)
			"http://media-cache-ec0.pinimg.com/originals/68/0b/69/680b69563aceba3df48b4483d007bce3.jpg",
			"http://media.giphy.com/media/VUC9YdLSnKuJy/giphy.gif",
			"http://media.giphy.com/media/OaHp43V1N4OvC/giphy.gif",
			"http://data.whicdn.com/images/19521764/tumblr_luch96ogPv1qemssho1_500_large.gif",
			"http://24.media.tumblr.com/f66cf98b45010359bea6ed008ffcd614/tumblr_n5eyqwMG1q1sf5vppo1_500.gif",
			"http://i.imgur.com/6mOAx9v.gif",
		];

		var randGif = gifs[Math.floor(Math.random() * gifs.length)];

		return randGif;
};

Template.landing.invitesLeft = function() {

	var obj = Meteor.subscribe('requestedInvites');

	if (obj.ready()) {
		var count = RequestedInvites.find({used: true}).count();
		var left = 490 - count;

		if (left > 1) {
			return "<span>" + left + "</span>" + " invites";
		} else if (left === 1) {
			return "<span>" + left + "</span>" + " invite";
		}

	};

};


Template.landing.events({

	'click #requestInvite' : function(event) {

		var email = $('#requestEmail').val();

		// Do a quick check to see if email conforms to a good format
		var emailRegex = /\S+@\S+\.\S+/;

		if (emailRegex.test(email)) {

			Meteor.call('requestInviteFlow', email, function(error, result) {
				
				if (error) {
					Notifications.error('Failed', error.reason);
				} else {
					Notifications.success('Request Successfully Received', 'We\'ve successfully received your request, you should get an email from us in a few!');
				}


			});


		} else {
			Notifications.error('Invalid Email', 'Please provide a valid email');
		}

	}

});


