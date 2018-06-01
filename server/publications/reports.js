import moment from 'moment';

Meteor.publish('currentReport', function () {
    const thisWeekStart = moment().startOf('isoWeek').toDate();
    const thisWeekEnd = moment().endOf('isoWeek').toDate();
    return ReportSummaries.find({
        "reports.userId": Meteor.userId(),
        reportsEndDate: thisWeekEnd,
        reportsStartDate: thisWeekStart
    }, {
        fields: {
            reportsStartDate: 1,
            reportsEndDate: 1,
            votingOpen: 1,
            votingCompleted: 1,
            distributionCompleted: 1,
            reports: {
                $elemMatch: {
                    userId: Meteor.userId()
                }
            }
        }
    });
});