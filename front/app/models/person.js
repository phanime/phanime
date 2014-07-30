import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	cover_photo: attr(),

	cover_photo_url: function() {
		return "http://cdn.phanime.com/images/people/cover/" + this.get('cover_photo');
	}.property('cover_photo'),	

	full_name: function() {
		return this.get('first_name') + " " + this.get('last_name');
	}.property('first_name', 'last_name'),
	full_name_slug: function() {
		return this.get('first_name') + "-" + this.get('last_name');
	}.property('first_name', 'last_name'),
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
	castings: hasMany('casting', {async: true}),
});
