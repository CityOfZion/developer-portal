import {check} from 'meteor/check';
import moment from 'moment';
import {Jobs} from 'meteor/msavin:sjobs';

Meteor.methods({
    addReport(content) {
        try {
            check(content, String);

            if (!Roles.userIsInRole(Meteor.userId(), ['developer', 'maintainer', 'contributor'])) {
                return {error: 'userNotAuthorized'}
            }

            const startOfWeek = moment().startOf('isoWeek');
            const endOfWeek = moment(startOfWeek).endOf('isoWeek');

            const reportSummary = ReportSummaries.findOne({
                "reports.user.id": Meteor.userId(),
                reportsEndDate: endOfWeek.toDate(),
                reportsStartDate: startOfWeek.toDate()
            });

            if (reportSummary) {
                return {error: 'Report already submitted'};
            }

            const data = {
                content,
                reportedOn: new Date(),
                user: {
                    id: Meteor.userId(),
                    username: Meteor.user().username,
                    type: Meteor.user().roles[0]
                },
                status: 'reported'
            };

            const result = ReportSummaries.update({
                reportsEndDate: endOfWeek.toDate(),
                reportsStartDate: startOfWeek.toDate()
            }, {$push: {reports: data}});

            return {result};
        } catch (e) {
            return {error: e.message};
        }
    },
    editReport(id, content) {
        try {
            check(id, String);
            check(content, String);

            if (!Roles.userIsInRole(Meteor.userId(), ['developer', 'maintainer', 'contributor'])) {
                return {error: 'userNotAuthorized'}
            }

            const reportSummary = ReportSummaries.findOne({_id: id, "reports.user.id": Meteor.userId()});

            if (!reportSummary) {
                return {error: 'Invalid user'};
            }

            if (moment(reportSummary.reportsEndDate).isoWeek() !== moment().isoWeek()) {
                return {error: 'This week is not available for editing'};
            }

            const result = ReportSummaries.update({
                _id: id,
                "reports.user.id": Meteor.userId()
            }, {$set: {"reports.$.content": content, "reports.$.updatedOn": new Date()}});

            return {result};
        } catch (e) {
            return {error: e.message};
        }
    },
    addVoteToReport(summaryId, targetUserId, vote) {
        try {
            check(summaryId, String);
            check(targetUserId, String);
            check(vote, Number);

            if (!Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
                return {error: 'userNotAuthorized'}
            }

            if (vote < 0 || vote > 10) {
                return {error: 'invalidVoteAmount'};
            }

            const reportSummary = ReportSummaries.findOne({_id: summaryId});
            const hasVoted = reportSummary.votes.some(vote => vote.userId === Meteor.userId() && targetUserId === vote.reportUserId);

            console.log('------------------------');
            console.log('hasVoted: ', hasVoted);
            console.log('------------------------');

            let result = null;

            // If user has voted already, update vote instead
            if (hasVoted) {

                result = ReportSummaries.update({
                    _id: reportSummary._id,
                    votes: {
                        $elemMatch: {
                            userId: {$eq: Meteor.userId()},
                            reportUserId: {$eq: targetUserId}
                        }
                    }
                }, {
                    $set: {
                        'votes.$.vote': vote
                    }
                });

            } else {
                result = ReportSummaries.update({
                    _id: reportSummary._id
                }, {
                    $push: {
                        votes: {
                            userId: Meteor.userId(),
                            vote: vote,
                            reportUserId: targetUserId
                        }
                    }
                });
            }

            // closing date isn't set yet
            if (!reportSummary.votingCloseDate) {
                const totalReportsVoted = reportSummary.votes.filter(vote => vote.userId === Meteor.userId()).length;
                const totalReports = reportSummary.reports.filter(report => report.user.type === "developer").length;

                // If true then start countdown for others to vote
                if (totalReports === totalReportsVoted) {
                    const closingDate = moment(moment().add(1, 'hour'));
                    console.log('Setting the closing date to: ', closingDate.toISOString());
                    ReportSummaries.update({_id: reportSummary._id}, {$set: {votingCloseDate: closingDate.toDate()}});

                    Jobs.run("closeVoting", reportSummary._id, {
                        in: {
                            hours: 1,
                        },
                        on: {
                            hour: closingDate.hour(),
                            minute: closingDate.minute(),
                            second: closingDate.second()
                        },
                        priority: 9999999999
                    });
                }
            }

            return {result};
        } catch (e) {
            return {error: e.message};
        }
    },
    getReportsRewards() {
        const summaries = ReportSummaries.find({
            "reports.user.id": Meteor.userId()
        }, {
            fields: {
                reports: {
                    $elemMatch: {
                        "user.id": Meteor.userId()
                    }
                }
            }
        }).fetch();

        let totals = 0;

        summaries.map(summary => {
            totals += summary.reports[0].rewardAmount || 0;
        });

        return totals;
    }
});