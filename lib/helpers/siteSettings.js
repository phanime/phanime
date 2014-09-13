siteSettings = {
	title: 'Phanime',
	slogan: 'Discover Anime like Never Before',
	separator: '|',
	getFullTitle: function(title) {
		return title + " " + this.separator + " " + this.title;
	}
};