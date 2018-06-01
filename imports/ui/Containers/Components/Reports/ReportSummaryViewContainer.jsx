import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import ReportSummaryView from "../../../Components/Reports/ReportSummaryView";

export default ReportSummaryViewContainer = withTracker(props => {

    const reportSummariesHandler = Meteor.subscribe('reportSummaryById', props.match.params.id);

    const loading = !reportSummariesHandler.ready();

    const reportSummary = ReportSummaries.findOne({_id: props.match.params.id});
    return {
        loading,
        reportSummary
    };
})(ReportSummaryView);