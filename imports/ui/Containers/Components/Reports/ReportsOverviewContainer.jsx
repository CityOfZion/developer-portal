import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import ReportsOverview from "../../../Components/Reports/ReportsOverview";

export default ReportsOverviewContainer = withTracker(() => {
    const reportsHandler = Meteor.subscribe('userReports');

    const loading = !reportsHandler.ready();
    const reportSummaries = ReportSummaries.find({}, {sort: {reportsEndDate: -1}}).fetch();
    let reports = [];

    if (reportSummaries) {
        reportSummaries.forEach(summary => {
            if (summary.reports) {
                const reportsTemp = summary.reports.map(report => {
                    report._id = summary._id;
                    return report;
                });
                reports = reports.concat(reportsTemp);
            }
        });

    }

    return {
        loading,
        reports
    };
})(ReportsOverview);