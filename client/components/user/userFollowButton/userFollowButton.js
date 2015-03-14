Template.userFollowButton.events({
  'click #userFollowButtonFollow' : function(event, template) {
    var user = template.data.user;
    Meteor.call('followUser', Meteor.userId(), user._id, function(error) {
      if (error) {
        console.log(error);
      }
    });
  },

  'click #userFollowButtonUnFollow' : function(event, template) {
    var user = template.data.user;
    Meteor.call('unFollowUser', Meteor.userId(), user._id, function(error) {
      if (error) {
        console.log(error);
      }
    });
  }
});
