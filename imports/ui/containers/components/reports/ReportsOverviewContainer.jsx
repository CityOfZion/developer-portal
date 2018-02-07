import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReportsOverview from "../../../components/reports/ReportsOverview";

export default ReportsOverviewContainer = withTracker(() => {
  const reportsHandler = Meteor.subscribe('report');
  
  const loading = !reportsHandler.ready();
  const reports = UserReports.find({}).fetch();
  
  return {
    loading,
    reports
  };
})(ReportsOverview);