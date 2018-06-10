module.exports = function () {
    this.Then(/^a report has been added$/, function () {

        browser.pause(1000);

        const reportCount = server.execute(function () {
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
            }).count();
        });

        expect(reportCount).toEqual(1);
    });

    this.Then(/^a report has been edited$/, function () {

        browser.pause(1000);

        const reportContent = server.execute(function () {
            const summary = ReportSummaries.findOne({
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

            return summary.reports[0].content;
        });

        expect(reportContent).toEqual('edit');
    });
};