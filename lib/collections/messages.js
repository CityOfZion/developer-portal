const MessageSchema = new SimpleSchema({
  dateSent: {
    label: 'Date',
    type: Date,
    optional: false
  },
  read: {
    label: 'Read',
    type: Boolean,
    optional: false,
    defaultValue: false
  },
  message: {
    label: 'Message',
    type: String,
    optional: false
  },
  byUser: {
    label: 'From user',
    type: String,
    optional: false
  }
});

const MessagesSchema = new SimpleSchema({
  fromUserId: {
    label: 'From user',
    type: String,
    optional: false
  },
  toUserId: {
    label: 'To user',
    type: String,
    optional: false
  },
  messages: {
    label: 'Messages',
    type: [MessageSchema],
    optional: true
  }
});


UserMessages = new Meteor.Collection('messages');

UserMessages.attachSchema(MessagesSchema);