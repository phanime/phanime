Template.clickableDropdown.events({
  'click .clickable-dropdown__handler' : function(event, template) {
    var dropdownEl = $(event.target).parents('.clickable-dropdown').children('.clickable-dropdown__menu');
    var isOpen = dropdownEl.hasClass('clickable-dropdown__menu--open');
    if (isOpen) {
      dropdownEl.removeClass('clickable-dropdown__menu--open');
    } else {
      dropdownEl.addClass('clickable-dropdown__menu--open');
    }
  }
});
