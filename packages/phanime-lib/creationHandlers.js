phanimeLib = {
	getSlug: function(value) {
		var slug = value.trim().replace(/[\.,-\/#$%\^&\*;:{}=\-_`~()?+']/g,"").toLowerCase();
		slug = slug.trim().replace(/\s+/g, '-');
		return slug;		
	},
	sanitizeDescription = function(description) {
		var description = description.trim().replace(/<br \/>/g, "");
		return description;
	}
};