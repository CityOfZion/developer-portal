import moment from 'moment';

Meteor.publish('reportSummaries', function() {
  if(Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
    return ReportSummaries.find({});
  }
  
  return null;
});

Meteor.publish('reportSummaryById', function(id) {
  return ReportSummaries.find({_id: id});
});

Meteor.publish('currentSummary', function() {
  const now = new Date();
  return ReportSummaries.find({reportsStartDate: {$lte: now}, reportsEndDate: {$gte: now}});
});