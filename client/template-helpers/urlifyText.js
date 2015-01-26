UI.registerHelper("urlifyText", function(text) {

	// We first want to escape all the html if there is any
	var text = _.escape(text);

	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;

	// Only one image allowed per post, the rest will be turned into urls
	var imageTrigger = false;
	var ourImage;

	text = text.replace(urlRegex, function(url,b,c) {
		var url2 = (c == 'www.') ?  'http://' +url : url;
		var imageRegex = /^http:\/\/.+\.(gif|png|jpg|jpeg)$/i;
		if (imageRegex.test(url2) && imageTrigger === false) {
			imageTrigger = true;
			ourImage = '<div><a href="' + url2 + '" target="_blank"><img src="' + url2 + '"></a></div>'; 
			return '';
		} else {
			return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
		}
	}); 

	if (ourImage) {
		text += "\n";
		text += ourImage;
	} 

	return text;

});