import moment from 'moment';
import { Email } from 'meteor/email';

const addReportSummary = () => {
  const thisWeekStart = moment().startOf('isoWeek');
  const thisWeekEnd = moment().endOf('isoWeek');
  
  const weekAgoStart = moment(moment().subtract(7, 'days')).startOf('isoWeek');
  const weekAgoEnd = moment(moment().subtract(7, 'days')).endOf('isoWeek');
  const week = weekAgoStart.isoWeek();
  
  const reports = UserReports.find({reportedOn: {$gte: weekAgoStart.toDate(), $lt: weekAgoEnd.toDate()}, status: 'reported'}).fetch();
  
  UserReports.update({reportedOn: {$gte: weekAgoStart.toDate(), $lt: weekAgoEnd.toDate()}, status: 'reported'}, {$set: {status: 'under review'}},{ multi: true});
  
  reports.forEach(report => {
    UserAlerts.insert({
      title: `Report ${week} locked`,
      content: `Your report for week ${week} is now locked and will be reviewed`,
      userId: report.userId,
      alertedOn: new Date(),
      read: false
    });
  });
  
  const weekAgoSummary = ReportSummaries.findOne({
    reportsStartDate: weekAgoStart.toDate(),
    reportsEndDate: weekAgoEnd.toDate()
  });
  
  let weekAgoSummaryId = false;
  
  if(!weekAgoSummary) {
    weekAgoSummaryId = ReportSummaries.insert({
      reportsStartDate: weekAgoStart.toDate(),
      reportsEndDate: weekAgoEnd.toDate(),
      totalReward: 0,
      totalReports: reports.length,
      votingOpen: false,
      votingCompleted: false,
      distributionCompleted: false
    });
  }
  
  Meteor.users.find({roles: 'council'}).fetch().forEach(user => {
    
    const alertExists = UserAlerts.find({userId: user._id, title: `Week ${week} review`}).count();
    if(!alertExists) {
      UserAlerts.insert({
        title: `Week ${week} review`,
        content: `Week ${week} is now ready to be reviewed and voted for`,
        userId: user._id,
        alertedOn: new Date(),
        read: false
      });
  
      Email.send({
        to: user.emails[0].address,
        from: 'notifications@cityofzion.io',
        subject: `Voting for week ${week} is now open`,
        html: `
        You can now vote on week ${week} here: ${Meteor.absoluteUrl()}council/reports/vote/${weekAgoSummaryId ? weekAgoSummaryId : weekAgoSummary._id}
        `
      });
    }
  });
  
  ReportSummaries.update({
    _id: weekAgoSummaryId ? weekAgoSummaryId : weekAgoSummary._id,
    votingCompleted: false
  }, {
    $set: {
      votingOpen: true
    }
  });
  
  const reportSummaryThisWeekExists = ReportSummaries.find({reportsStartDate: thisWeekStart.toDate(), reportsEndDate: thisWeekEnd.toDate()}).count();
  // Insert new week
  if(!reportSummaryThisWeekExists) {
    ReportSummaries.insert({
      reportsStartDate: thisWeekStart.toDate(),
      reportsEndDate: thisWeekEnd.toDate(),
      totalReward: 0,
      totalReports: reports.length,
      votingOpen: false,
      votingCompleted: false,
      distributionCompleted: false
    });
  }
};

export {
  addReportSummary
};