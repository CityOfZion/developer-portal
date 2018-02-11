Meteor.publish('comments', () => {
  return UserComments.find({toUserId: Meteor.userId()});
});

Meteor.publish('unreadComments', () => {
  return UserComments.find({toUserId: Meteor.userId(), read: false});
});