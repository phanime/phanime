import DS from 'ember-data';

var attr = DS.attr,
	hasMany = DS.hasMany,
	belongsTo = DS.belongsTo;

export default DS.Model.extend({
	user_id: belongsTo('user', {async: true}),
	
	// We can change the title depending on the user selection
	title: function() {
		return this.get('canonical_title');
	}.property('romaji_title', 'english_title', 'japanese_title', 'canonical_title'),
	canonical_title: attr(),
	romaji_title: attr(),
	english_title: attr(),
	japanese_title: attr(),
	slug: attr(),
	cover_image: attr(),
	
	// Get full url of anime cover image
	cover_image_url: function() {
		if (this.get('cover_image')) {
			return "http://cdn.phanime.com/images/anime/cover/" + this.get('cover_image');
		} else {
			return this.get('settings.naImage');
		} 
	}.property('cover_image'),

	banner_image: attr(),

	banner_image_url: function() {
		if (this.get('banner_image')) {
			return "http://cdn.phanime.com/images/anime/banner/" + this.get('banner_image');
		} else {
			return this.get('settings.naImage');
		} 
	}.property('banner_image'),

	type: attr(),
	status: attr(),
	start_date: attr(),
	end_date: attr(),
	version: attr(),
	age_rating: attr(),
	description: attr(),
	season_number: attr(),
	total_episodes: attr(),
	episode_duration: attr(),
	title_synonyms: attr(),
	featured: attr(),
	rating: attr(),
	rating_count: attr(),
	rating_updated_at: attr(),
	episodes: hasMany('episode', {async: true}),
	genres: hasMany('genre', {async: true}),
	castings: hasMany('casting', {async: true}),
	staff_members: hasMany('staff_member', {async: true}),
	producers: hasMany('producer', {async: true}),


});
