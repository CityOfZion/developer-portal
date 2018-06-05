import {Jobs} from 'meteor/msavin:sjobs';

Jobs.register({
    "closeVoting": function (summaryId) {
        console.log('closeVoting', summaryId);
        const result = ReportSummaries.update({
            _id: summaryId
        }, {
            $set: {
                votingOpen: false,
                votingCompleted: true,
                "reports.$.status": "under review"
            },
            multi: true
        });
        console.log('closeVotingResult', result);
        if (result) this.success(result);
        else this.failure(result);
    }
});