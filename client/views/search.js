Template.search.rendered = function() {
	$('input').focus();
};


Template.search.events({

	'click .close-search-handler' : function() {
		Session.set('isSearchingGlobal', false);
	}

	
});
