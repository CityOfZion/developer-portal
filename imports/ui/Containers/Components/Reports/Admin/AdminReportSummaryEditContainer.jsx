import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AdminReportSummaryEdit from "../../../../Components/Reports/admin/AdminReportSummaryEdit";

export default AdminReportSummaryEditContainer = withTracker(props => {
  const reportSummariesHandler = Meteor.subscribe('reportSummaryById', props.match.params.id);
  
  const loading = !reportSummariesHandler.ready();
  const reportSummaries = ReportSummaries.find({_id: props.match.params.id}).fetch();
  
  return {
    loading,
    reportSummaries
  };
})(AdminReportSummaryEdit);