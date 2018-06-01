import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import ReportSummaryWidget from "../../../Components/Widgets/ReportSummaryWidget";

export default ReportSummaryWidgetContainer = withTracker(() => {
    const reportsHandle = Meteor.subscribe('userReports');

    const loading = !reportsHandle.ready();

    const reports = ReportSummaries.find({"reports.user.id": Meteor.userId()}, {_id: 1, rewardAmount: 1}).fetch();

    return {
        loading,
        reports
    };
})(ReportSummaryWidget);