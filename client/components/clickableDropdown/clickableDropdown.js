Template.clickableDropdown.onCreated(function() {
	this.isOpen = new ReactiveVar(false);
});

Template.clickableDropdown.events({
	'click .clickable-dropdown__handler' : function(event, template) {
		var dropdownEl = $(event.target).parents('.clickable-dropdown').children('.clickable-dropdown__menu');
		var isOpen = dropdownEl.hasClass('clickable-dropdown__menu--open');
		if (isOpen) {
			template.isOpen.set(false);
			dropdownEl.removeClass('clickable-dropdown__menu--open');
		} else {
			template.isOpen.set(true);
			dropdownEl.addClass('clickable-dropdown__menu--open');
		}
	},

	'click .clickable-dropdown__backdrop' : function(event, template) {
		var dropdownEl = $(event.target).parents('.clickable-dropdown').children('.clickable-dropdown__menu');
		dropdownEl.removeClass('clickable-dropdown__menu--open');
		template.isOpen.set(false);
	}
});

Template.clickableDropdown.helpers({
	isOpen: function() {
		return Template.instance().isOpen.get();
	}
});
