import React, { Component } from 'react';
import moment from 'moment';
import ContentTable from "../../Widgets/ContentTable";
import Spinner from 'react-spinkit';

class AdminReportsOverview extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      maxItemsPerPage: 10,
      totalItems: 0,
      currentPage: 1,
      pages: 1
    }
  }
  
  changePageCallback = (page) => {
    switch(page) {
      case 'prev':
        if(this.state.currentPage > 1) {
          this.setState({currentPage: this.state.currentPage - 1});
        }
        break;
      case 'next':
        if(this.state.currentPage < this.state.pages) {
          this.setState({currentPage: this.state.currentPage + 1});
        }
        break;
      default:
        if(page > 0 && page <= this.state.pages) this.setState({currentPage: page});
    }
  };
  
  getWeeklySummaryStatus(summary) {
    if (summary.votingOpen) return 'Awaiting Votes';
    if (summary.votingCompleted && summary.distributionCompleted) return 'Completed';
    if (summary.votingCompleted) return 'Awaiting Distribution';
    return 'Awaiting End of Week';
  }
  
  editButtonEnabled(summary) {
    if (!summary) return false;
    if (summary.votingOpen) return true;
    if (summary.votingCompleted && summary.distributionCompleted) return false;
    if (summary.votingCompleted) return true;
  }
  
  voteButtonEnabled(summary) {
    if (!summary) return false;
    if (summary.votingOpen) return true;
    if (summary.votingCompleted && summary.distributionCompleted) return false;
    if (summary.votingCompleted) return false;
  }
  
  voteButton(summary) {
    const now = moment();
    const endDate = moment(summary.votingCloseDate);
    const diff = endDate - now;
    const timeRemaining = moment.duration(diff, 'milliseconds');
    
    const voteLabel = summary.votingCloseDate ? `Vote (ends in ${timeRemaining.days()}D ${timeRemaining.hours()}H ${timeRemaining.minutes()}M ${timeRemaining.seconds()}S)` : 'Vote';
    
    return this.voteButtonEnabled(summary) ?
      <button className="btn btn-sm btn-warning" onClick={e => this.props.history.push('/council/reports/vote/' + summary._id)}><i className="fa fa-hand-paper-o"> </i> {voteLabel}</button> :
      '';
  }
  
  render() {
    const {history} = this.props;
    
    if(!this.props.reportSummaries) return <div style={{height: '80vh', display:'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner name="ball-triangle-path" /></div>;
    
    const headers = ['Week', 'Year', 'Reports', 'Status', 'Rewards', 'Action'];
    const items = this.props.reportSummaries.map((summary, index) => {
      return (
        <tr key={summary._id}>
          <td>{moment(summary.reportsEndDate).isoWeek()}</td>
          <td>{moment(summary.reportsEndDate).year()}</td>
          <td>{summary.totalReports}</td>
          <td>{this.getWeeklySummaryStatus(summary)}</td>
          <td>{!summary || summary.totalReward === 0 ? 'Not yet assigned' : summary.totalReward}</td>
          <td>
            {this.voteButton(summary)}
            {this.editButtonEnabled(summary) ? <button className="btn btn-sm btn-success" onClick={e => history.push('/council/reports/edit/' + summary._id)}><i className="fa fa-pencil"> </i> Edit</button> : ''}
            <button className="btn btn-sm btn-primary" onClick={e => history.push('/council/reports/view/' + summary._id)}><i
              className="fa fa-eye"> </i> View
            </button>
          </td>
        </tr>
      )
    });
    
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-9">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Reports Overview
              </div>
              <div className="card-block">
                <ContentTable
                  headers={headers}
                  items={items}
                  pages={Math.ceil(this.props.reportSummaries.length / this.state.maxItemsPerPage)}
                  currentPage={this.state.currentPage}
                  changePageCallback={this.changePageCallback}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            No filters available yet
          </div>
        </div>
      </div>
    )
  }
}

export default AdminReportsOverview;
