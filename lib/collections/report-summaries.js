const reportSummariesSchema = new SimpleSchema({
  reportsStartDate: {
    label: "Start Date",
    type: Date,
    optional: false
  },
  reportsEndDate: {
    label: "End Date",
    type: Date,
    optional: false
  },
  voteStartDate: {
    label: "Voting Start Date",
    type: Date,
    optional: true
  },
  voteEndDate: {
    label: "Voting End Date",
    type: Date,
    optional: true
  },
  totalReward: {
    label: "Total Rewards",
    type: Number,
    optional: false
  },
  totalReports: {
    label: "Total Reports",
    type: Number,
    optional: true
  },
  votingOpen: {
    label: "Voting Open",
    type: Boolean,
    optional: false
  },
  votingCloseDate: {
    label: 'Voting closing date',
    type: Date,
    optional: true
  },
  votingCompleted: {
    label: "Voting Completed",
    type: Boolean,
    optional: false,
    defaultValue: false
  },
  distributionCompleted: {
    label: "Distribution Completed",
    type: Boolean,
    optional: false,
    defaultValue: false
  }
});

ReportSummaries = new Meteor.Collection('reportSummaries');
ReportSummaries.attachSchema(reportSummariesSchema);