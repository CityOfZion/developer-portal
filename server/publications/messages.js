Meteor.publish('messages', function() {
  return Messages.find({ $or: [{fromUserId: Meteor.userId()}, {toUserId: Meteor.userId()}]});
});

Meteor.publish('messagesById', function(id) {
  return Messages.find({$or: [{fromUserId: Meteor.userId()}, {toUserId: Meteor.userId()}], _id: id});
});

Meteor.publish('unreadMessages', function() {
  return Messages.find({ $or: [{fromUserId: Meteor.userId()}, {toUserId: Meteor.userId()}], messages: {$elemMatch: {read: false}}});
});