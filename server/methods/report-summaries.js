import {check} from 'meteor/check';

const getVoteTotals = (votes) => {
  return votes.reduce((a, b) => {
    return a + b.vote;
  }, 0)
};

const getUserReportRewards = (reports, reportSummary) => {
  
  let totalAmountOfVotes = 0;
  
  reports.forEach(report => {
    totalAmountOfVotes += report.votes.reduce((a, b) => {
      return a + b.vote;
    }, 0);
  });
  
  const items = reports.map(report => {
    const votePercentage = getVoteTotals(report.votes) / totalAmountOfVotes * 100;
    report.rewardAmount = Math.ceil(reportSummary.totalReward * votePercentage / 100);
    return report;
  });
  
  return items;
};

Meteor.methods({
  setReportSummaryTotalReward(id, amount) {
    try {
  
      check(id, String);
      check(amount, Number);
      
      if(!Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
        return {error: 'userNotAuthorized'}
      }
      
      const result = ReportSummaries.update({_id: id}, {$set: {totalReward: amount}});
      
      return {result};
    } catch(e) {
      return {error: e.message};
    }
  },
  completeDistribution(id) {
    try {
      const result = ReportSummaries.update({_id: id}, {$set: {distributionCompleted: true, votingOpen: false, votingCompleted: true}});
      const reportSummary = ReportSummaries.findOne({_id: id});
      const reports = UserReports.find({
        reportedOn: {
          $gte: reportSummary.reportsStartDate,
          $lte: reportSummary.reportsEndDate
        }}).fetch();
      
      const updatedReports = getUserReportRewards(reports, reportSummary);
      console.log(updatedReports);
      updatedReports.forEach(report => {
        UserReports.update({_id: report._id}, {$set: {rewardAmount: report.rewardAmount, status: 'rewarded'}});
      });
      
      return {result}
    } catch(e) {
      return {error: e.message}
    }
  }
});