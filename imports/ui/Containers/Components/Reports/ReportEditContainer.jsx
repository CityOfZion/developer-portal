import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import ReportEdit from "../../../Components/Reports/ReportEdit";

export default ReportEditContainer = withTracker(props => {
    const reportsHandle = Meteor.subscribe('reportById', props.match.params.id);

    const loading = !reportsHandle.ready();
    const reportSummary = ReportSummaries.find({}).fetch();

    return {
        loading,
        reportSummary
    };
})(ReportEdit);