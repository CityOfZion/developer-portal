import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import ContentTable from "../../widgets/ContentTable";

class AdminReportsOverview extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        reports: Meteor.subscribe('reports'),
        reportSummaries: Meteor.subscribe('reportSummaries')
      },
      maxItemsPerPage: 10,
      totalItems: 0,
      currentPage: 1,
      pages: 1
    }
  }
  
  componentWillUnmount() {
    this.state.subscription.reports.stop();
  }
  
  reports() {
    let reports = Reports.find({}, {sort: {year: -1, _id: -1}, limit: this.state.maxItemsPerPage, skip: (this.state.currentPage - 1) * this.state.maxItemsPerPage}).fetch();
    const reportSummaries = ReportSummaries.find({}, {sort: {reportsEndDate: -1}}).fetch();
    
    const repSum = {};
    reportSummaries.forEach(sum => {
      repSum[moment(sum.reportsEndDate).format('YYYY-W')] = sum;
    });
    
    reports.map(report => {
      report.votingActive = !repSum[report._id] || repSum[report._id].voteCompleted;
      report.summary = !repSum[report._id] ? false : repSum[report._id];
      return report;
    });
    
    return reports;
  }
  
  componentDidUpdate() {
    this.reportCount();
  }
  
  reportCount() {
    const reportsCount = Reports.find({}).count();
    const pages = Math.ceil(reportsCount / this.state.maxItemsPerPage);
    if(pages !== this.state.pages) this.setState({pages: pages});
    return reportsCount;
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
    if (!summary) return 'Awaiting End of Week';
    if (summary.votingOpen) return 'Awaiting Votes';
    if (summary.votingCompleted && summary.distributionCompleted) return 'Completed';
    if (summary.votingCompleted) return 'Awaiting Distribution';
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
  
  render() {
    const {history} = this.props;
    const currentWeek = moment().isoWeek();
    
    const headers = ['Week', 'Year', 'Reports', 'Status', 'Rewards', 'Action'];
    const items = this.reports().map((report, index) => {
      const [year, week] = report._id.split('-');
      return (
        <tr key={report._id}>
          <td>{week}</td>
          <td>{year}</td>
          <td>{report.reports.length}</td>
          <td>{this.getWeeklySummaryStatus(report.summary)}</td>
          <td>{!report.summary || report.summary.totalReward === 0 ? 'Not yet assigned' : report.summary.totalReward}</td>
          <td>
            {this.editButtonEnabled(report.summary) ? <button className="btn btn-sm btn-success" onClick={e => history.push('/council/reports/edit/' + report.summary._id)}><i className="fa fa-pencil"> </i> Edit</button> : ''}
            {this.voteButtonEnabled(report.summary) ? <button className="btn btn-sm btn-warning" onClick={e => history.push('/council/reports/vote/' + report.summary._id)}><i className="fa fa-hand-paper-o"> </i> Vote</button> : ''}
            <button className="btn btn-sm btn-primary" onClick={e => history.push('/council/reports/view/' + report.summary._id)}><i
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
                <i className="fa fa-align-justify"></i> Reports
              </div>
              <div className="card-block">
                <ContentTable
                  headers={headers}
                  items={items}
                  pages={this.state.pages}
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

ReactMixin(AdminReportsOverview.prototype, TrackerReactMixin);


export default AdminReportsOverview;
