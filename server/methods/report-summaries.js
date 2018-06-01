import {check} from 'meteor/check';

const getVoteTotals = (votes) => {
    return votes.reduce((a, b) => {
        return a + b.vote;
    }, 0)
};

const getUserReportRewards = (reports, reportSummary) => {
    try {
        let totalAmountOfVotes = 0;

        reports.forEach(report => {
            totalAmountOfVotes += report.votes.reduce((a, b) => {
                return a + b.vote;
            }, 0);
        });

        const items = reports.map(report => {
            const votePercentage = getVoteTotals(report.votes) / totalAmountOfVotes * 100;
            report.rewardAmount = Math.ceil(reportSummary.totalReward * votePercentage / 100);
            return report;
        });

        return items;
    } catch (e) {
        return {error: e.message}
    }
};

Meteor.methods({
    setReportSummaryTotalReward(id, amount) {
        try {
            check(id, String);
            check(amount, Number);

            if (!Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
                return {error: 'userNotAuthorized'}
            }

            const result = ReportSummaries.update({_id: id}, {$set: {totalReward: amount}});

            return {result};
        } catch (e) {
            return {error: e.message};
        }
    },
    completeDistribution(id) {
        try {
            check(id, String);

            const result = ReportSummaries.update({
                _id: id
            }, {
                $set: {
                    distributionCompleted: true,
                    votingOpen: false,
                    votingCompleted: true
                }
            });

            const reportSummary = ReportSummaries.findOne({_id: id});

            const reports = reportSummary.reports.filter(report => report.user.type === 'developer');

            const updatedReports = getUserReportRewards(reports, reportSummary);
            ReportSummaries.update({
                _id: id,
                "reports.$.user.type": "developer"
            }, {
                $set: {
                    "reports.$.status": "rewarded"
                }
            }, {
                safe: true,
                multi: true
            });

            return {result}
        } catch (e) {
            return {error: e.message}
        }
    }
});