import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend({
	needs: 'anime',
	isEditing: false,

	changeVidName: function() {
		var video_host = this.get('model.video_host');
		var name = this.get('model.video_name');
		name = name.substring(0, name.indexOf('-')) + " " + video_host;
		this.set('model.video_name', name);
		console.log(name);

	}.observes('model.video_host'),

	actions: {
		edit: function() {
			this.toggleProperty('isEditing');
		},
		save_changes: function(video) {

			var onSuccess = function(video) {
				var msg = video.get('video_name') + " was successfully saved.";
				console.log(msg);
				Notify.success(msg);
			};

			var onFailure = function() {
				var msg = "Something went wrong, video was not saved.";
				console.log(msg);
				Notify.warning(msg);
			};

			video.save().then(onSuccess, onFailure);
		},
	},

	// Select required properties 
	// TODO: put these in the database preferably
	video_versions: [
		"Subbed",
		"Dubbed"
	],
	video_hosts: [
		"UploadAnime",
		"AUEngine",
		"DailyMotion",
		"Mp4Upload",
		"PutLocker",
		"RuTube",
		"Upload2",
		"Veevr",
		"VideoBam",
		"VideoNest",
		"YourUpload",
		"Youtube",
		"Zunux",
	],
	video_qualities: [
		"SD",
		"720p",
		"1080p",
	],
});
