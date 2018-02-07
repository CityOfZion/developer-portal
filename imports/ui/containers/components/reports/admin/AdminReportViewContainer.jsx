import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AdminReportView from "../../../../components/reports/admin/AdminReportView";

export default AdminReportsOverviewContainer = withTracker(props => {
  
  console.log('AdminReportsOverviewContainer', props);
  
  const reportsHandler = Meteor.subscribe('adminReportsOverviewBySummaryId', props.match.params.id);
  const reportSummariesHandler = Meteor.subscribe('reportSummaryById', props.match.params.id);
  
  const loading = !reportsHandler.ready() || !reportSummariesHandler.ready();
  
  const reports = UserReports.find({}).fetch();
  const joinedReportSummaries = AdminReports.find({}, {sort: {reportsEndDate: -1}}).fetch();
  const reportSummary = ReportSummaries.findOne({_id: props.match.params.id});
  return {
    loading,
    reports,
    joinedReportSummaries,
    reportSummary
  };
})(AdminReportView);