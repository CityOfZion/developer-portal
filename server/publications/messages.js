Meteor.publish('messages', function() {
  return UserMessages.find({ $or: [{fromUserId: Meteor.userId()}, {toUserId: Meteor.userId()}]});
});

Meteor.publish('messagesById', function(id) {
  return UserMessages.find({$or: [{fromUserId: Meteor.userId()}, {toUserId: Meteor.userId()}], _id: id});
});

Meteor.publish('unreadMessages', function() {
  return UserMessages.find({ $or: [{fromUserId: Meteor.userId()}, {toUserId: Meteor.userId()}], messages: {$elemMatch: {read: false}}});
});