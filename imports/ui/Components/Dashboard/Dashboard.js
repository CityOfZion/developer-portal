import React, {Component} from 'react';
import ProfileWarningWidget from "../Widgets/ProfileWarningWidget";
import ReportRewardTotals from "../Widgets/ReportRewardTotals";
import ReportSummaryWidgetContainer from "../../Containers/Components/Widgets/ReportSummaryWidgetContainer";

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <ProfileWarningWidget/>
                    {Roles.userIsInRole(Meteor.userId(), ['developer', 'payroll']) ? <ReportSummaryWidgetContainer/> :
                        <div></div>}
                    {Roles.userIsInRole(Meteor.userId(), ['developer', 'payroll']) ? <ReportRewardTotals/> :
                        <div></div>}
                </div>
            </div>
        )
    }
}

export default Dashboard;
