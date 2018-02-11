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
  if(!Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) return null;
  
  const now = new Date();
  const query = {reportsStartDate: {$lte: now}, reportsEndDate: {$gte: now}};
  const results = ReportSummaries.find(query);
  return results;
});