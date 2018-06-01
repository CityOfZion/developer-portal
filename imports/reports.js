import moment from 'moment';
import {Email} from 'meteor/email';
import {alertUser} from "/imports/alerts";

const addReportSummary = () => {

    const thisWeekStart = moment().startOf('isoWeek');
    const thisWeekEnd = moment().endOf('isoWeek');

    const weekAgoStart = moment(moment().subtract(7, 'days')).startOf('isoWeek');
    const weekAgoEnd = moment(moment().subtract(7, 'days')).endOf('isoWeek');
    const week = weekAgoStart.isoWeek();

    const weekAgoSummary = ReportSummaries.findOne({
        reportsStartDate: weekAgoStart.toDate(),
        reportsEndDate: weekAgoEnd.toDate()
    });

    const setReportsUnderView = ReportSummaries.update({
        reportsStartDate: weekAgoStart.toDate(),
        reportsEndDate: weekAgoEnd.toDate(),
        "reports.$.status": "reported"
    }, {
        $set: {
            "reports.$.status": "under review"
        }
    }, {
        safe: true,
        multi: true
    });

    if (setReportsUnderView) {
        weekAgoSummary.reports.forEach(report => {
            const title = `Report ${week} locked`;
            const content = `Your report for week ${week} is now locked and will be reviewed`;

            alertUser(report.userId, title, content);
        });
    }

    let weekAgoSummaryId = false;

    if (!weekAgoSummary) {
        weekAgoSummaryId = ReportSummaries.insert({
            reportsStartDate: weekAgoStart.toDate(),
            reportsEndDate: weekAgoEnd.toDate(),
            totalReward: 0,
            votingOpen: false,
            votingCompleted: false,
            distributionCompleted: false,
            reports: [],
            votes: []
        });
    }

    Meteor.users.find({roles: 'council'}).fetch().forEach(user => {

        const alertExists = UserAlerts.find({userId: user._id, title: `Week ${week} review`}).count();
        if (!alertExists) {
            UserAlerts.insert({
                title: `Week ${week} review`,
                content: `Week ${week} is now ready to be reviewed and voted for`,
                userId: user._id,
                alertedOn: new Date(),
                read: false
            });

            Email.send({
                to: user.emails[0].address,
                from: 'notifications@cityofzion.io',
                subject: `Voting for week ${week} is now open`,
                html: `
        You can now vote on week ${week} here: ${Meteor.absoluteUrl()}council/reports/vote/${weekAgoSummaryId ? weekAgoSummaryId : weekAgoSummary._id}
        `
            });
        }
    });

    ReportSummaries.update({
        _id: weekAgoSummaryId ? weekAgoSummaryId : weekAgoSummary._id,
        votingCompleted: false
    }, {
        $set: {
            votingOpen: true
        }
    });

    const reportSummaryThisWeekExists = ReportSummaries.findOne({
        reportsStartDate: {$lt: new Date()},
        reportsEndDate: {$gt: new Date()}
    });

    // Insert/update new week
    if (!reportSummaryThisWeekExists) {

        ReportSummaries.upsert({
            _id: reportSummaryThisWeekExists ? reportSummaryThisWeekExists._id : false
        }, {
            reportsStartDate: thisWeekStart.toDate(),
            reportsEndDate: thisWeekEnd.toDate(),
            totalReward: 0,
            reports: [],
            votes: [],
            votingOpen: false,
            votingCompleted: false,
            distributionCompleted: false
        });
    }
};

export {
    addReportSummary
};