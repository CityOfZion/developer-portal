import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import ReportRewardTotals from "../../../Components/Widgets/ReportRewardTotals";

export default ReportRewardTotalsContainer = withTracker(() => {
    const totals = Meteor.call('getReportsRewards');

    return {
        totals
    };
})(ReportRewardTotals);