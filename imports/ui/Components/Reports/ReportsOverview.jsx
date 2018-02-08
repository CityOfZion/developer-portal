import React, { Component } from 'react';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import ContentTable from "../Widgets/ContentTable";

class ReportsOverview extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      maxItemsPerPage: 10,
      totalItems: 0,
      currentPage: 1,
      pages: 1
    }
  }
  
  reports() {
    return UserReports.find({}, {sort: {week: -1}, limit: this.state.maxItemsPerPage, skip: (this.state.currentPage - 1) * this.state.maxItemsPerPage}).fetch();
  }
  
  componentDidUpdate() {
    this.reportCount();
  }
  
  reportCount() {
    const reportsCount = UserReports.find({}).count();
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
  
  render() {
    const {history} = this.props;
    const currentWeek = moment().isoWeek();
    
    const headers = ['Week', 'Report Date', 'Updated on', 'Status', 'Reward', 'Action'];
    const items = this.reports().map((report, index) => {
      return (
        <tr key={report._id}>
          <td>{report.week}</td>
          <td>{moment(report.reportedOn).format('YYYY/MM/DD HH:mm:ss')}</td>
          <td>{report.updatedOn ? moment(report.updatedOn).format('YYYY/MM/DD HH:mm:ss') : 'n/a'}</td>
          <td>{report.status}</td>
          <td>{report.reward || 'Not yet assigned'}</td>
          <td>
            {report.week === currentWeek ? <button className="btn btn-sm btn-warning" onClick={e => history.push('/reports/edit/' + report._id)}><i className="fa fa-pencil"> </i> Edit</button> : ''}
            <button className="btn btn-sm btn-primary" onClick={e => history.push('/reports/' + report._id)}><i
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

export default ReportsOverview;
