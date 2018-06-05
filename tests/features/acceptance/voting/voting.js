import moment from 'moment';
import faker from 'faker';
import user from '../../user-fixtures';

module.exports = function () {
    this.Then(/^there are (.*) reports$/, function (numberOfReports) {
        const reports = [];

        console.log('Checking ' + numberOfReports + ' reports');

        for(let i = 0; i < numberOfReports; i++) {

            const addedUser = user.add('contributor');

            reports.push({
                "content" : faker.lorem.sentence(),
                "reportedOn" : moment(moment().subtract(7, 'days')).toDate(),
                "user" : {
                    "id" : addedUser._id,
                    "username" : addedUser.username,
                    "type" : "contributor"
                },
                "status" : "reported"
            });
        }

        console.log('reports', reports);


        const reportCount = server.execute(function (reports) {
            const reportSummary = ReportSummaries.findOne({}, {sort: {reportsStartDate: 1}});

            ReportSummaries.update({
                _id: reportSummary._id
            }, {
                $set: {
                    reports: reports
                }
            });

            return reports.length;
        }, reports);

        expect(parseInt(numberOfReports)).toEqual(reportCount);
    });
};