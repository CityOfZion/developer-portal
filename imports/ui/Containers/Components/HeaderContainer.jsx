import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Header from "../../Components/Header";

export default HeaderContainer = withTracker(() => {
  const unreadMessagesHandle = Meteor.subscribe('unreadMessages');
  const unreadAlertsHandle = Meteor.subscribe('unreadAlerts');
  const unreadTasksHandle = Meteor.subscribe('unreadTasks');
  const unreadCommentsHandle = Meteor.subscribe('unreadComments');
  const currentReportHandle = Meteor.subscribe('currentReport');
  const reportSummaryHandle = Meteor.subscribe('currentSummary');
  
  const loading = !unreadAlertsHandle.ready() ||
                  !unreadMessagesHandle.ready() ||
                  !reportSummaryHandle.ready() ||
                  !unreadCommentsHandle.ready() ||
                  !unreadTasksHandle.ready() ||
                  !currentReportHandle.ready();
  
  const unreadMessages = UserMessages.find({read: false}).fetch();
  const unreadComments = UserComments.find({read: false}).fetch();
  const unreadAlerts = UserAlerts.find({read: false}).fetch();
  const unreadTasks = UserTasks.find({read: false}).fetch();
  const reportSummary = ReportSummaries.find({}).fetch();
  const currentReport = UserReports.find({}).fetch();
  
  return {
    loading,
    unreadMessages,
    unreadComments,
    unreadAlerts,
    unreadTasks,
    reportSummary,
    currentReport
  };
})(Header);