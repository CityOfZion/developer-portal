import moment from 'moment';

SyncedCron.add({
  name: 'Check if week is over',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.recur().first().minute().first().second().first().dayOfWeek();
    // return parser.text('every 1 minute')
  },
  job: function() {
    const thisWeekStart = moment().startOf('isoWeek');
    const thisWeekEnd = moment().endOf('isoWeek');
    
    const weekAgoStart = moment(moment().subtract(8, 'days')).startOf('isoWeek');
    const weekAgoEnd = moment(moment().subtract(8, 'days')).endOf('isoWeek');
    const week = weekAgoStart.isoWeek();
    
    const reports = Reports.find({reportedOn: {$gte: weekAgoStart.toDate(), $lt: weekAgoEnd.toDate()}, status: 'reported'}).fetch();
    
    Reports.update({reportedOn: {$gte: weekAgoStart.toDate(), $lt: weekAgoEnd.toDate()}, status: 'reported'}, {$set: {status: 'under review'}},{ multi: true});
    
    reports.forEach(report => {
      Alerts.insert({
        title: `Report ${week} locked`,
        content: `Your report for week ${week} is now locked and will be reviewed`,
        userId: report.userId,
        alertedOn: new Date(),
        read: false
      });
    });
    
    Meteor.users.find({roles: 'council'}).fetch().forEach(user => {
      Alerts.insert({
        title: `Week ${week} review`,
        content: `Week ${week} is now ready to be reviewed and voted for`,
        userId: user._id,
        alertedOn: new Date(),
        read: false
      });
    });
    
    ReportSummaries.update({
      reportsStartDate: weekAgoStart.toDate(),
      reportsEndDate: weekAgoEnd.toDate()
    }, {
      $set: {
        votingOpen: true
      }
    });
    
    // Insert new week
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
});

SyncedCron.start();