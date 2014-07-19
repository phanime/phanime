import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params) {
		return this.store.find('video', params.video_id);
	},
	afterModel: function(video) {
		var siteTitle = "phanime";
		var episode = this.modelFor('episode');
		var episode_name = episode.get('episode_name');
		document.title = episode_name + " " + video.get('video_host') + " | " + siteTitle;
	}
});
