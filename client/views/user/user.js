// Creating reactive variables
Template.user.created = function() {
	var self = this;
	// Initialize the chart object with a null value
	// so we can show a loading indicator
	this.topGenresChartObject = new ReactiveVar(null);

	// Initialize reactive variables
	this.loaded = new ReactiveVar(20);
	this.limit = new ReactiveVar(20);
	this.ready = new ReactiveVar(false);

	this.autorun(function() {
		var limit = self.limit.get();
		var subscription = Meteor.subscribe('userWithProfilePosts', self.data.username, limit);

		// We wait until we've got the subscription to be ready
		if (subscription.ready()) {
			self.loaded.set(limit);
			self.ready.set(true);
		} else {
			self.ready.set(false);
		}
	});

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


Template.user.events({

	'click #loadMore' : function(event, template) {
		var limit = template.limit.get();
		var increment = 20;

		// Let's increment limit by our increment amount, so we can grab the next amount of profileposts
		template.limit.set(limit + increment);
	}

});

Template.user.helpers({
	topGenresChartObject: function() {
		var template = Template.instance();
		return template.topGenresChartObject.get();
	},
	isReady: function() {
		return Template.instance().ready.get();
	},
	hasMoreProfilePosts: function() {
		return ProfilePosts.find().count() >= Template.instance().limit.get();
	}
});