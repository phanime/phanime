Meteor.startup(function() {
  SyncedCron.start();

  SyncedCron.options = {
  	log: false
  };
});