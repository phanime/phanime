import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	user_id: belongsTo('user', {async: true}),
	anime_id: belongsTo('anime', {async: true}),
	library_entry_anime_name: attr(),
	library_entry_episodes_seen: attr(),
	library_entry_status: attr(),
	library_entry_private: attr(),
	library_entry_watch_priority: attr(),
	library_entry_score: attr(),
	library_entry_comments: attr(),
	library_entry_rewatched_count: attr(),
	created_at: attr(),
	updated_at: attr(),
});
