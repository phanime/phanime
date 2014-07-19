import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	cover_photo: attr(),
	first_name: attr(),
	last_name: attr(),
	japanese_name: attr(),
	alternate_name: attr(),
	gender: attr(),
	biography: attr(),
	anime: hasMany('anime', {async: true}),
	people: hasMany('person', {async: true}),
});
