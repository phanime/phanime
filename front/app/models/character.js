import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	cover_photo: attr(),
	full_name: function() {
		return this.get('first_name') + " " + this.get('last_name');
	}.property('first_name', 'last_name'),
	full_name_slug: function() {
		return this.get('first_name') + "-" + this.get('last_name');
	}.property('first_name', 'last_name'),
	first_name: attr(),
	last_name: attr(),
	japanese_name: attr(),
	alternate_name: attr(),
	gender: attr(),
	biography: attr(),
	casting: hasMany('casting', {async:true}),
});
