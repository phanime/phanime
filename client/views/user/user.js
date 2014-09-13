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


// Creating reactive variables
Template.user.created = function() {

	// Initialize the chart object with a null value
	// so we can show a loading indicator
	this.topGenresChartObject = new ReactiveVar(null);

};


Template.user.rendered = function() {
	var template = this;
	var self = this;

	// Grab the Top Genres chart data
	Meteor.call('topGenresChartData', this.data._id, function(error, result) {

		var chartOptions = {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false
			},
			title: {
				text: self.data.username + "'s top genres"
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
				data: result
			}]
		};

		template.topGenresChartObject.set(chartOptions);
	});
};


Template.user.topGenresChartObject = function() {


	var template = Template.instance();
	return template.topGenresChartObject.get();

};