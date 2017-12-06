Meteor.publish('getPublicProfileById', function(userId) {
  Meteor.users.find({_id: userId}, {username: 1, emails: 0});
});