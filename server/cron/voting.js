import { Jobs } from 'meteor/msavin:sjobs';

Jobs.register({
  "closeVoting": function(summaryId) {
    console.log('closeVoting', summaryId);
    const result = ReportSummaries.update({_id: summaryId}, {$set: {votingOpen: false, votingCompleted: true}});
    if(result) this.success(result);
    else this.failure(result);
  }
});