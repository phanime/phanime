getSlug = function(value) {
	var slug = value.trim().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()?+']/g,"").toLowerCase();
	slug = slug.trim().replace(/\s+/g, '-');
	return slug;		
};