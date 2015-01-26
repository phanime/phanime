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
				text: self.data.displayName() + "'s top genres"
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


Template.user.helpers({
	topGenresChartObject: function() {
		var template = Template.instance();
		return template.topGenresChartObject.get();

	}
});