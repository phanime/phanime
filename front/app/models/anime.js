import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	user_id: belongsTo('user', {async: true}),
	anime_title: attr(),
	anime_slug: attr(),
	anime_cover_image: attr(),
	anime_banner_image: attr(),
	anime_type: attr(),
	anime_status: attr(),
	anime_start_date: attr(),
	anime_end_date: attr(),
	anime_version: attr(),
	age_rating: attr(),
	anime_description: attr(),
	anime_season_number: attr(),
	anime_total_episodes: attr(),
	anime_episode_duration: attr(),
	anime_main_alternative_title: attr(),
	anime_alternative_titles: attr(),
	anime_featured: attr(),
	anime_rating: attr(),
	anime_rating_count: attr(),
	anime_rating_updated_at: attr(),
	episodes: hasMany('episode', {async: true}),
	genres: hasMany('genre', {async: true}),
});
