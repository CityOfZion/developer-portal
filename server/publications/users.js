Meteor.publish('getPublicProfileById', function(userId) {
  Meteor.users.find({_id: userId}, {username: 1, emails: 0});
});

Meteor.publish('userList', function() {
  if(Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
    return Meteor.users.find({}, {$sort: {username: 1}});
  }
});