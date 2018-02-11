import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AdminReportDistributionView from "../../../../Components/Reports/admin/AdminReportDistributionView";

export default AdminReportDistributionViewContainer = withTracker(props => {
  const reportSummariesHandler = Meteor.subscribe('reportSummaryById', props.match.params.id);
  
  const loading = !reportSummariesHandler.ready();
  
  const reportSummaries = ReportSummaries.find({_id: props.match.params.id}).fetch();
  
  return {
    loading,
    reportSummaries
  };
})(AdminReportDistributionView);