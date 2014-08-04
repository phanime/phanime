import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(date) {
	console.log(date);
	return moment(date).fromNow();  
});
