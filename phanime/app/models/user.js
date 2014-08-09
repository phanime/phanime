import DS from 'ember-data';

var attr = DS.attr;

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
});
