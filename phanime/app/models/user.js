import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany;

export default DS.Model.extend({
	avatar: attr(),
	profileBanner: attr(),
	username: attr(),
	email: attr(),
	gender: attr(),
	custom_title: attr(),
	user_state: attr(),
	primary_role_id: attr(),
	register_date: attr(),
	last_activity: attr(),
	anime_library_watched_minutes: attr(),
	anime_library_count: attr(),

	avatarUrl: function() {
		if (this.get('avatar')) {

			return "http://phanime.s3.amazonaws.com/images/users/avatar/" + this.get('id') + "/" + this.get('avatar');

		} else {

			return this.get('settings.naImage');

		}
	}.property('avatar', 'id'),

	profileBannerUrl: function() {
		return "http://cdn.phanime.com/images/users/profileBanner/" + this.get('id') + "/" + this.get('profileBanner');
	}.property('profileBanner', 'id'),

	library_entries: hasMany('libraryEntry', {async:true})
});
