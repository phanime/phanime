import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	cover_photo: attr(),
	first_name: attr(),
	last_name: attr(),
	given_name: attr(),
	family_name: attr(),
	gender: attr(),
	birth_date: attr(),
	website: attr(),
	birth_place: attr(),
	blood_type: attr(),
	other_info: attr(),
	anime: hasMany('anime', {async: true}), // Only Staff, voice actors are not directly related to anime
	characters: hasMany('character', {async: true}),
});
