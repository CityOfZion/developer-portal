import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import AdminReportsOverview from "/imports/ui/components/reports/admin/AdminReportsOverview";

export default AdminReportsOverviewContainer = withTracker(() => {
  const reportSummariesHandler = Meteor.subscribe('reportSummaries');
  
  const loading = !reportSummariesHandler.ready();
  const reportSummaries = ReportSummaries.find({}, {sort: {reportsEndDate: -1}}).fetch();
  
  return {
    loading,
    reportSummaries
  };
})(AdminReportsOverview);