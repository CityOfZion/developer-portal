Meteor.methods({
  sendChatMessage(chatId, message) {
    return Messages.update({_id: chatId}, {
      $push: {
        messages: {
          dateSent: new Date(),
          read: false,
          message: message,
          byUser: Meteor.userId()
        }
      }
    });
  },
  createChat(targetUser) {
    return Messages.insert({
      fromUserId: Meteor.userId(),
      toUserId: targetUser,
      messages: []
    });
  }
});