import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	name: attr(),
	slug: attr(),
	description: attr(),
	anime_count: attr(),
	anime: hasMany('anime', {async: true}),
});
