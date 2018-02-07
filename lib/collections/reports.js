const voteSchema = new SimpleSchema({
  userId: {
    label: 'User ID',
    type: String,
    optional: false
  },
  vote: {
    label: 'Vote',
    type: Number,
    optional: false
  }
});

const reportSchema = new SimpleSchema({
  userId: {
    label: 'User ID',
    type: String,
    optional: false
  },
  content: {
    label: 'Content',
    type: String,
    optional: false
  },
  reportedOn: {
    label: 'Date',
    type: Date,
    optional: false
  },
  updatedOn: {
    label: 'Last updated',
    type: Date,
    optional: true
  },
  status: {
    label: 'Status',
    type: String,
    optional: false,
    allowedValues: ['reported', 'under review', 'rewarded']
  },
  votes: {
    label: 'Votes',
    type: [voteSchema],
    optional: false
  },
  rewardAmount: {
    label: 'Reward',
    type: Number,
    optional: true
  },
  transactionId: {
    label: "Transaction ID",
    type: String,
    optional: true
  }
});

UserReports = new Meteor.Collection('reports');

UserReports.attachSchema(reportSchema);