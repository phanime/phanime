import DS from 'ember-data';

var attr = DS.attr,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	user_id: belongsTo('user', {async: true}),
	episode_id: belongsTo('episode', {async: true}),
	video_name: attr(),
	video_id: attr(),
	video_version: attr(),
	video_host: attr(),
	video_display_order: attr(),
	video_quality: attr(),
	created_at: attr(),
	updated_at: attr(),
});
