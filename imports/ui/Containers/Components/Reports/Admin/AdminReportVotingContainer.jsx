import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import AdminReportVoting from "../../../../Components/Reports/admin/AdminReportVoting";

export default AdminReportVotingContainer = withTracker(props => {
    const reportSummariesHandler = Meteor.subscribe('reportSummaryByIdAndType', props.match.params.id, 'developer');

    const loading = !reportSummariesHandler.ready();
    const reportSummary = ReportSummaries.findOne({
        _id: props.match.params.id
    });

    return {
        loading,
        reportSummary
    };
})(AdminReportVoting);