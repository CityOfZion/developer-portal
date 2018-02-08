import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AdminReportVoting from "../../../../components/reports/admin/AdminReportVoting";

export default AdminReportVotingContainer = withTracker(props => {
  const reportSummariesHandler = Meteor.subscribe('adminReportsOverviewBySummaryId', props.match.params.id);
  
  const loading = !reportSummariesHandler.ready();
  const reportSummaries = ReportSummaries.find({}, {sort: {reportsEndDate: -1}}).fetch();
  
  return {
    loading,
    reportSummaries
  };
})(AdminReportVoting);