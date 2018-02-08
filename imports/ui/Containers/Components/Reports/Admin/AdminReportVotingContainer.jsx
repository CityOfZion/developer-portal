import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AdminReportVoting from "../../../../Components/Reports/admin/AdminReportVoting";

export default AdminReportVotingContainer = withTracker(props => {
  const reportSummariesHandler = Meteor.subscribe('adminReportsOverviewBySummaryId', props.match.params.id);
  
  const loading = !reportSummariesHandler.ready();
  const reports = AdminReports.find({}).fetch();
  
  return {
    loading,
    reports
  };
})(AdminReportVoting);