import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	genre_name: attr(),
	genre_slug: attr(),
	genre_description: attr(),
	anime_count: attr(),
	anime: hasMany('anime', {async: true}),
});
