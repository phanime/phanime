import Ember from 'ember';

export default Ember.FileField.extend({
	url: '',
	filesDidChange: (function() {
		var uploadUrl = this.get('url');
		var files = this.get('files');

		var uploader = Ember.S3Uploader.create({
			url: uploadUrl,
			type: 'PUT',
		});

		uploader.on('progress', function(e) {
			console.log(e.percent);
		});	

		uploader.on('didUpload', function(response) {
			var uploadedUrl = $(response).find('Location')[0].textContent;
			uploadedUrl = unescape(uploadedUrl);
		});	

		var promise = uploader.upload(files);

		promise.then(function(data) {
			console.log(data);
		}, function(error) {
			console.log(error);
		});

		if (!Ember.isEmpty(files)) {
			uploader.upload(files[0]);
		}


	}).observes('files')	
});
