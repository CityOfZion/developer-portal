import {check} from 'meteor/check';

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
  }
});