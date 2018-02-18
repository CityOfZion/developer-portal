import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReportsOverview from "../../../Components/Reports/ReportsOverview";

export default ReportsOverviewContainer = withTracker(() => {
  const reportsHandler = Meteor.subscribe('userReports');
  
  const loading = !reportsHandler.ready();
  const reports = UserReports.find({}, {sort: {week: -1}}).fetch();
  
  return {
    loading,
    reports
  };
})(ReportsOverview);