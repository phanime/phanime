Template.userSummary.events({
	
	'click #follow' : function(event, template) {
		var user = template.data;
		
		// Run a method on the server to add the follower
		Meteor.call('followUser', Meteor.userId(), user._id, function(error, result) {
			console.log(error);
			console.log(result);
		});

	},

	'click #unfollow' : function (event, template) {
		var user = template.data;

		console.log('unfollow users');

		// Run a method on the server to unfollow a user
		Meteor.call('unFollowUser', Meteor.userId(), user._id, function(error, result) {
			console.log(error);
			console.log(result);
		});
	}
	
});




// Charts data 
// Get user's top genres

Template.user.topGenresChart = function() {
	return {
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: this.username + "'s top genres"
		},
		tooltip: {
			pointFormat: '<b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
					style: {
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					},
					connectorColor: 'silver'
				}
			}
		},
		series: [{
			type: 'pie',
			name: 'genre',
			data: [
				['Adventure',   45.0],
				['Action',       26.8],
				['Ecchi',   12.8],
				['Comedy',    8.5],
				['Yuri',     6.2]
			]
		}]
	};
};
// return {
// 		chart: {
// 			plotBackgroundColor: null,
// 			plotBorderWidth: null,
// 			plotShadow: false
// 		},
// 		title: {
// 			text: this.username + "'s top genres"
// 		},
// 		tooltip: {
// 			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
// 		},
// 		plotOptions: {
// 			pie: {
// 				allowPointSelect: true,
// 				cursor: 'pointer',
// 				dataLabels: {
// 					enabled: true,
// 					format: '<b>{point.name}</b>: {point.percentage:.1f} %',
// 					style: {
// 						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
// 					},
// 					connectorColor: 'silver'
// 				}
// 			}
// 		}
// 	};
// };