import React, {Component} from 'react';
import ErrorModal from "/imports/ui/Components/ErrorModal";
import showdown from 'showdown';
import moment from 'moment';
import {replaceURLWithHTMLLinks} from "/imports/helpers/helpers";
import FoldingCard from "../../Widgets/FoldingCard";
import Spinner from 'react-spinkit';

class AdminReportDistributionView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      totalReward: 0,
      summaryId: ''
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.reportSummaries.length > 0 && this.props.reportSummaries[0].totalReward !== this.state.totalReward && !this.state.initialized) {
      this.setState({
        totalReward: this.props.reportSummaries[0].totalReward,
        summaryId: this.props.reportSummaries[0]._id,
        initialized: true
      });
    }
  }
  
  resetForm() {
    this.setState({totalReward: 0});
  }
  
  submitForm() {
    if (this.state.totalReward >= 0) {
      Meteor.call('setReportSummaryTotalReward', this.props.match.params.id, parseInt(this.state.totalReward), (err, res) => {
        if (err) {
          this.setState({editReportSummaryError: true, editReportSummaryErrorMessage: err.reason});
        } else {
          if (res.error) {
            this.setState({editReportSummaryError: true, editReportSummaryErrorMessage: res.error});
          } else {
            this.setState({editReportSummarySuccess: true});
          }
        }
      })
    }
  }
  
  render() {
    const {history, reportSummaries} = this.props;
    const report = reportSummaries && reportSummaries()[0] ? reportSummaries[0] : false;
    const converter = new showdown.Converter({
      simplifiedAutoLink: true,
      excludeTrailingPunctuationFromURLs: true,
      openLinksInNewWindow: true,
      simpleLineBreaks: true,
    });
    
    if(!report) return <div style={{height: '80vh', display:'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner name="ball-triangle-path" /></div>;
  
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-eye"> </i> Viewing report summary for week {moment(report.reportsEndDate).subtract(1, 'd').isoWeek()}
              </div>
              <div className="card-block">
                <div className="form-group row">
                  <label className="col-md-3 form-control-label">Report End Date</label>
                  <div className="col-md-9">
                    <p className="form-control-static">{moment(report.reportsEndDate).format('YYYY-MM-DD HH:mm')}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label">Amount of reports</label>
                  <div className="col-md-9">
                    <p className="form-control-static">{report.totalReports}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label">Voting</label>
                  <div className="col-md-9">
                    <p className="form-control-static">
                      {report.votingOpen ? 'Open for voting' : 'Voting is closed'}<br/>
                      {report.votingCompleted ? 'Voting is completed' : 'Voting is incomplete'}
                    </p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label">Distribution</label>
                  <div className="col-md-9">
                    <p
                      className="form-control-static">{report.distributionCompleted ? 'Distributed' : 'Not yet distributed'}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label">Reward amount</label>
                  <div className="col-md-9">
                    <p
                      className="form-control-static">{report.distributionCompleted ? 'Distributed' : 'Not yet distributed'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-files-o"> </i> Reports
              </div>
              <div className="card-block">
                {reports.reports.map((rep, index) =>
                  <FoldingCard
                    key={index}
                    header={`${rep.user.username} reported on ` + moment(rep.reportedOn).format('YYYY-MM-DD HH:mm')}
                    content={replaceURLWithHTMLLinks(converter.makeHtml(rep.content))}
                  />
                )}
              
              </div>
            </div>
          </div>
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

export default AdminReportDistributionView;
