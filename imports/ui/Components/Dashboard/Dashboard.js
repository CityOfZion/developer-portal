import React, { Component } from 'react';
import ProfileWarningWidget from "../Widgets/ProfileWarningWidget";
import ReportSummaryWidgetContainer from "../../Containers/Components/Widgets/ReportSummaryWidgetContainer";
import ReportRewardsTotalsContainer from "../../Containers/Components/Widgets/ReportRewardsTotalsContainer";

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <ProfileWarningWidget/>
          <ReportSummaryWidgetContainer/>
          <ReportRewardsTotalsContainer/>
        </div>
      </div>
    )
  }
}

export default Dashboard;
