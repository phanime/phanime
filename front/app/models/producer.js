import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	producer_logo: attr(),
	name: attr(),
	slug: attr(),
	description: attr(),
	anime: hasMany('anime', {async: true}),
});
