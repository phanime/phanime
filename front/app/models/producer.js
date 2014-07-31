import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	producer_logo: attr(),
	name: attr(),
	slug: attr(),
	description: attr(),
	anime: hasMany('anime', {async: true}),

	producer_logo_url: function() {
		return "http://cdn.phanime.com/images/producer/cover/" + this.get('producer_logo');
	}.property('producer_logo'),
});
