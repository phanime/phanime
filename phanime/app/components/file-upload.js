import Ember from 'ember';

export default Ember.FileField.extend({
	url: '',
	extraParams: '',
	filesDidChange: (function() {
		var uploadUrl = this.get('url');
		var files = this.get('files');
		var defaultParams;
		var extraParams = this.get('extraParams');

		var uploader = Ember.S3Uploader.create({
			url: uploadUrl,
			type: 'PUT',
		});

		uploader.on('progress', function(e) {
			console.log(e.percent);
		});	
		var self = this;
		uploader.on('didUpload', function(response) {
			var uploadedUrl = $(response).find('Location')[0].textContent;
			uploadedUrl = unescape(uploadedUrl);
			self.sendAction('action', {name: files, url: uploadedUrl});
		});	

		//var promise = uploader.upload(files);

		// promise.then(function(data) {
		// 	console.log(data);
		// }, function(error) {
		// 	console.log(error);
		// });
		console.log(files[0]);
		if (!Ember.isEmpty(files)) {
			defaultParams = 'name=' + files[0].name + '&type=' + files[0].type + '&size=' + files[0].size;
			uploader.upload(files[0], defaultParams + extraParams);
		}


	}).observes('files')	
});
