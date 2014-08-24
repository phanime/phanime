getSlug = function(value) {
	var slug = value.trim().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()?+']/g,"").toLowerCase();
	slug = slug.replace(/\s+/g, '-');
	return slug;		
};