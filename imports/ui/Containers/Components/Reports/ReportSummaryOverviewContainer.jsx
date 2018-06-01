import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import ReportSummaryOverview from "../../../Components/Reports/ReportSummaryOverview";

export default ReportSummaryOverviewContainer = withTracker(props => {

    const reportSummariesHandler = Meteor.subscribe('reportSummaries');

    const loading = !reportSummariesHandler.ready();

    const reportSummaries = ReportSummaries.find({}, {sort: {reportsEndDate: -1}}).fetch();

    return {
        loading,
        reportSummaries
    };
})(ReportSummaryOverview);