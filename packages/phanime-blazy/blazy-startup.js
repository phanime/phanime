if (Meteor.isClient) {
  Meteor.startup(function() {
    var blazy = new Blazy({
      selector: '.img'
    });
  });
}
