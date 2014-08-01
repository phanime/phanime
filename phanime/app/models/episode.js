import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	user_id: belongsTo('user', {async: true}),
	anime_id: belongsTo('anime', {async: true}),
	name: attr(),
	episode_multiple: attr(),
	episode_number: attr(),
	episode_number_other: attr(),
	episode_title: attr(),
	air_date: attr(),
	already_aired: attr(),
	episode_version: attr(),
	created_at: attr(),
	updated_at: attr(),
	videos: hasMany('video', {async: true}),
});
