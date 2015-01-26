UI.registerHelper("arrayifyObject", function(obj) {
	result = [];
	for (var key in obj) result.push({name:key,value:obj[key]});
	return result;
});