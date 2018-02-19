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
  if(!Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
    const now = new Date();
    const query = {reportsStartDate: {$lte: now}, reportsEndDate: {$gte: now}};
    return ReportSummaries.find(query, {reportsEndDate: 1, reportsStartDate: 1});
  } else {
    const now = new Date();
    const query = {reportsStartDate: {$lte: now}, reportsEndDate: {$gte: now}};
    return ReportSummaries.find(query);
  }
});