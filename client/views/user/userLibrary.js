Template.userLibrary.rendered = function() {
	$('.libraryEntryCard').popover({
		html: true,
		placement: 'auto right',
		content: function() {
			return $(this).find('.libraryEntryForm').html();
		},
		trigger: 'click'
	});
};

Template.userLibrary.watchStatuses = [
	"Watching",
	"Completed",
	"Plan to watch",
	"On hold",
	"Dropped",
];