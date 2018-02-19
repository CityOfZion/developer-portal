import React, {Component} from 'react';
import ErrorModal from "/imports/ui/Components/ErrorModal";
import showdown from 'showdown';
import moment from 'moment';
import {replaceURLWithHTMLLinks} from "/imports/helpers/helpers";
import FoldingCard from "../../Widgets/FoldingCard";
import ContentTable from "../../Widgets/ContentTable";
import Spinner from 'react-spinkit';

class AdminReportView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      totalReward: 0,
      totalVotes: 0,
      summaryId: ''
    }
  }
  
  getVoteAverage(votes) {
    return this.getVoteTotals(votes) / votes.length;
  }
  
  getVoteTotals(votes) {
    return votes.reduce((a, b) => {
      return a + b.vote;
    }, 0)
  }
  
  componentWillReceiveProps(props) {
    this.countVotes(props.joinedReportSummaries);
  }
  
  countVotes(summaries) {
    const joinedReportSummary = summaries.length > 0 ? summaries[0] : false;
    
    if(!joinedReportSummary || this.state.initialized) return false;
    
    let totalAmountOfVotes = 0;
    
    joinedReportSummary.reports.forEach(report => {
      totalAmountOfVotes += report.votes.reduce((a, b) => {
        return a + b.vote;
      }, 0);
    });
    
    this.setState({totalVotes: totalAmountOfVotes, initialized: true});
  }
  
  overview(reportSummary) {
    return <div className="col-lg-6">
      <div className="card">
        <div className="card-header">
          <i className="fa fa-eye"> </i> Viewing report summary for week {moment(reportSummary.reportsEndDate).subtract(1, 'd').isoWeek()}
        </div>
        <div className="card-block">
          <div className="form-group row">
            <label className="col-md-3 form-control-label">Report End Date</label>
            <div className="col-md-9">
              <p className="form-control-static">{moment(reportSummary.reportsEndDate).format('YYYY-MM-DD HH:mm')}</p>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 form-control-label">Voting End Date</label>
            <div className="col-md-9">
              <p className="form-control-static">{reportSummary.votingCloseDate ? moment(reportSummary.votingCloseDate).format('YYYY-MM-DD HH:mm') : 'Not decided yet'}</p>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 form-control-label">Total rewards</label>
            <div className="col-md-9">
              <p className="form-control-static">{reportSummary.totalReward}</p>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 form-control-label">Amount of reports</label>
            <div className="col-md-9">
              <p className="form-control-static">{reportSummary.totalReports}</p>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 form-control-label">Voting</label>
            <div className="col-md-9">
              <p className="form-control-static">
                {reportSummary.votingOpen ? 'Open for voting' : 'Voting is closed'}<br/>
                {reportSummary.votingCompleted ? 'Voting is completed' : 'Voting is incomplete'}
              </p>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 form-control-label">Distribution</label>
            <div className="col-md-9">
              <p
                className="form-control-static">{reportSummary.distributionCompleted ? 'Distributed' : 'Not yet distributed'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  
  reportsView(joinedReportSummary) {
    const converter = new showdown.Converter();
  
    return <div className="col-lg-6">
      <div className="card">
        <div className="card-header">
          <i className="fa fa-files-o"> </i> Reports
        </div>
        <div className="card-block">
          {joinedReportSummary.reports.map((report, index) =>
            <FoldingCard
              key={index}
              header={`${report.user.username} reported on ` + moment(report.reportedOn).format('YYYY-MM-DD HH:mm')}
              content={replaceURLWithHTMLLinks(converter.makeHtml(report.content))}
            />
          )}
    
        </div>
      </div>
    </div>
  }
  
  distributionView(joinedReportSummary, reportSummary) {
  
    const headers = ['Username', 'Vote avg', 'Vote %', 'Reward', 'address'];
    const items = joinedReportSummary.reports.map((report, index) => {
    
      const voteAverage = this.getVoteAverage(report.votes);
      const votePercentage = this.getVoteTotals(report.votes) / this.state.totalVotes * 100;
      const neoRewarded = Math.ceil(reportSummary.totalReward * votePercentage / 100);
      return <tr key={index}>
        <td>{report.user.username}</td>
        <td>{voteAverage.toFixed(2)}</td>
        <td>{votePercentage.toFixed(2)}%</td>
        <td>{neoRewarded}</td>
        <td>{report.user.mainWalletAddress ? report.user.mainWalletAddress : 'No address specified'}</td>
      </tr>
    });
    
    return <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <i className="fa fa-money"></i> Distribution
        </div>
      
        <div className="card-block">
          <ContentTable
            headers={headers}
            items={items}
            pages={1}
            currentPage={1}
          />
        </div>
      </div>
    </div>
  }
  
  render() {
    const {history, reports, reportSummary, joinedReportSummaries} = this.props;
  
    const joinedReportSummary = joinedReportSummaries.length > 0 ? joinedReportSummaries[0] : false;
    
    
    return (
      <div className="animated fadeIn">
        <div className="row">
          {reportSummary ? this.overview(reportSummary) : ''}
          {joinedReportSummary ? this.reportsView(joinedReportSummary) : ''}
          {joinedReportSummary && reportSummary ? this.distributionView(joinedReportSummary, reportSummary) : ''}
        </div>
        <ErrorModal
          opened={this.state.editReportSummaryError}
          type="warning"
          message={this.state.editReportSummaryErrorMessage}
          disableCancel={true}
          title="Error"
          callback={() => this.setState({editReportSummaryError: false, editReportSummaryErrorMessage: ''})}/>
        <ErrorModal
          opened={this.state.editReportSummarySuccess}
          type="success"
          message="Your report was edited"
          disableCancel={true}
          title="Success"
          callback={() => this.setState({editReportSummarySuccess: false})}/>
      </div>
    )
  }
}

export default AdminReportView;
