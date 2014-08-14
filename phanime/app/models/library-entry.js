import DS from 'ember-data';
// import Ember from 'ember';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	user_id: belongsTo('user', {async: true}),
	anime: belongsTo('anime'),	
	anime_name: attr(),
	episodes_seen: attr(),
	status: attr(),
	private: attr('boolean'),
	watch_priority: attr(),
	score: attr(),
	comments: attr(),
	rewatching: attr('boolean'),
	rewatched_count: attr(),
	created_at: attr(),
	updated_at: attr(),
});
