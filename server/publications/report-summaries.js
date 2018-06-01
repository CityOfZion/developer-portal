import moment from "moment/moment";

Meteor.publish('reportSummaries', function () {
    if (Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
        return ReportSummaries.find({});
    }

    return ReportSummaries.find({}, {
        fields: {
            _id: 1,
            reportsStartDate: 1,
            reportsEndDate: 1,
            votingOpen: 1,
            votingCompleted: 1,
            distributionCompleted: 1,
            reports: 1
        }
    });
});

Meteor.publish('reportSummaryById', function (id) {
    return ReportSummaries.find({_id: id});
});

Meteor.publish('reportSummaryByIdAndType', function (id, type) {
    return ReportSummaries.find({
        _id: id,
        "reports.user.type": type
    }, {
        fields: {
            votes: 1,
            reportsStartDate: 1,
            reportsEndDate: 1,
            votingOpen: 1,
            votingCompleted: 1,
            distributionCompleted: 1,
            reports: {
                $elemMatch: {
                    "user.type": type
                }
            }
        }
    });
});

Meteor.publish('userReports', function () {
    return ReportSummaries.find({
        "reports.user.id": Meteor.userId()
    }, {
        fields: {
            _id: 1,
            reportsStartDate: 1,
            reportsEndDate: 1,
            votingOpen: 1,
            votingCompleted: 1,
            distributionCompleted: 1,
            reports: {
                $elemMatch: {
                    "user.id": Meteor.userId()
                }
            }
        }
    });
});

Meteor.publish('currentSummary', function () {

    const thisWeekStart = moment().startOf('isoWeek').toDate();
    const thisWeekEnd = moment().endOf('isoWeek').toDate();

    if (!Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
        return ReportSummaries.find({
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
                        "user.id": Meteor.userId()
                    }
                }
            }
        });
    } else {
        return ReportSummaries.find({
            reportsEndDate: thisWeekEnd,
            reportsStartDate: thisWeekStart
        });
    }
});