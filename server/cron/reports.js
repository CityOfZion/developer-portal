import {addReportSummary} from "../../imports/reports";

SyncedCron.add({
    name: 'Check if week is over',
    schedule: function (parser) {
        // parser is a later.parse object
        return parser.recur().on(1).minute().first().second().first().dayOfWeek();
        // return parser.text('every 1 minute')
    },
    job: function () {
        addReportSummary();
    }
});

SyncedCron.start();