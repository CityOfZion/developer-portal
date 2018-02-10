import { Jobs } from 'meteor/msavin:sjobs';

Jobs.register({
  "closeVoting": function(summaryId) {
    ReportSummaries.update({_id: summaryId}, {votingOpen: false, votingCompleted: true})
  }
});