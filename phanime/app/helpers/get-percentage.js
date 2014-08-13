import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(num,den) {
	console.log(num + " " + den);
	if (!den) {
		return '0%';
	} else if (!num) {

		return '0%';

	} else {

		return ((num/den)*100).toFixed(2) + "%";

	} 
});
