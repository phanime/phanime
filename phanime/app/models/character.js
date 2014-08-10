import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	cover_photo: attr(),

	cover_photo_url: function() {

		if (this.get('cover_photo')) {
			return "http://cdn.phanime.com/images/characters/cover/" + this.get('cover_photo');
		} else {
			return this.get('settings.naImage');
		}
		
	}.property('cover_photo'),	

	full_name: function() {

		if (this.get('last_name')) {
			return this.get('first_name') + " " + this.get('last_name');
		} else {
			return this.get('first_name');
		}

	}.property('first_name', 'last_name'),
	full_name_slug: function() {

		if (this.get('last_name')) {
			return this.get('first_name') + "-" + this.get('last_name');
		} else {
			return this.get('first_name');
		}

	}.property('first_name', 'last_name'),
	first_name: attr(),
	last_name: attr(),
	japanese_name: attr(),
	alternate_name: attr(),
	gender: attr(),
	biography: attr(),
	casting: hasMany('casting', {async:true}),
	created_at: attr(),
	updated_at: attr(),
});
