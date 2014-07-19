import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(video_id, video_host) {
	console.log(video_id);
	console.log(video_host);
	var video_html;

	if (video_host === 'UploadAnime') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://uploadani.me/?attachment_id=' + video_id + '&kgvid_video_embed[enable]=true"></iframe>';
	} else if (video_host === 'AUEngine') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://auengine.com/embed.php?file=' + video_id + '&w=100%&h=100%"></iframe>';
	} else if (video_host === 'DailyMotion') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://www.dailymotion.com/embed/video/' + video_id + '"></iframe>';
	} else if (video_host === 'Mp4Upload') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://mp4upload.com/embed-' + video_id + '.html"></iframe>';
	} else if (video_host === 'PutLocker') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://www.putlocker.com/embed/' + video_id + '"></iframe>';
	} else if (video_host === 'RuTube') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://rutube.ru/video/embed/' + video_id + '"></iframe>';
	} else if (video_host === 'Upload2') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://upload2.com/embed/' + video_id + '"></iframe>';
	} else if (video_host === 'Veevr') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://veevr.com/embed/' + video_id + '"></iframe>';
	} else if (video_host === 'VideoBam') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://mp4upload.com/embed-' + video_id + '.html"></iframe>';
	} else if (video_host === 'VideoNest') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://www.videonest.net/embed-' + video_id + '.html"></iframe>';
	} else if (video_host === 'YourUpload') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://mp4upload.com/embed-' + video_id + '.html"></iframe>';
	} else if (video_host === 'Youtube') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://www.youtube.com/embed/' + video_id + '"></iframe>';
	} else if (video_host === 'Zunux') {
		video_html = '<iframe id="video" title="' + video_host + '" allowfullscreen=true type="text/html" frameborder="0" scrolling="no" src="http://mp4upload.com/embed-' + video_id + '.html"></iframe>';
	}

	console.log(video_html);

	return new Ember.Handlebars.SafeString(video_html);
});
