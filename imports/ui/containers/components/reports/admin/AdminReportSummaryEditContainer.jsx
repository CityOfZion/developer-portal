import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AdminReportSummaryEdit from "../../../../components/reports/admin/AdminReportSummaryEdit";

export default AdminReportSummaryEditContainer = withTracker(props => {
  const reportSummariesHandler = Meteor.subscribe('reportSummaryById', props.match.params.id);
  
  const loading = !reportSummariesHandler.ready();
  const reportSummaries = ReportSummaries.find({}).fetch();
  
  return {
    loading,
    reportSummaries
  };
})(AdminReportSummaryEdit);