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
    userType: {
        type: String,
        allowedValues: ['developer', 'payroll']
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
        type: Date,
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    },
    status: {
        label: 'Status',
        type: String,
        optional: false,
        allowedValues: ['reported', 'under review', 'rewarded']
    },
    rewardAmount: {
        label: 'Reward',
        type: Number,
        optional: true
    }
});

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
    },
    reports: {
        type: [reportSchema],
        optional: true
    },
    votes: {
        type: [voteSchema],
        optional: true
    }
});

ReportSummaries = new Meteor.Collection('reportSummaries');
// ReportSummaries.attachSchema(reportSummariesSchema);