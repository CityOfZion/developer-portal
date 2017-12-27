import React, {Component} from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import ErrorModal from "/imports/ui/components/ErrorModal";
import showdown from 'showdown';
import moment from 'moment';
import {replaceURLWithHTMLLinks} from "/imports/helpers/helpers";
import FoldingCard from "../../widgets/FoldingCard";

class AdminReportSummaryEdit extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      subscription: {
        reportSummaries: Meteor.subscribe('reportSummaryById', this.props.match.params.id),
        reports: Meteor.subscribe('admin.reportsOverviewBySummaryId', this.props.match.params.id)
      },
      totalReward: 0,
      summaryId: ''
    }
  }
  
  componentWillUnmount() {
    this.state.subscription.reportSummaries.stop();
    this.state.subscription.reports.stop();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.reportSummaries().length > 0 && this.reportSummaries()[0].totalReward !== this.state.totalReward && !this.state.initialized) {
      this.setState({
        totalReward: this.reportSummaries()[0].totalReward,
        summaryId: this.reportSummaries()[0]._id,
        initialized: true
      });
    }
  }
  
  resetForm() {
    this.setState({totalReward: 0});
  }
  
  reportSummaries() {
    return ReportSummaries.find({}).fetch();
  }
  
  reports() {
    const reports = AdminReports.find({}).fetch();
    return reports;
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
    const {history} = this.props;
    const report = this.reportSummaries()[0] || {};
    const reports = this.reports()[0] || {reports: []};
    const converter = new showdown.Converter();
    
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-eye"> </i> Viewing report summary for week {moment(report.reportsEndDate).isoWeek()}
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
                    <p className="form-control-static">{report.distributionCompleted ? 'Distributed' : 'Not yet distributed'}</p>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 form-control-label">Reward amount</label>
                  <div className="col-md-9">
                    <p className="form-control-static">{report.distributionCompleted ? 'Distributed' : 'Not yet distributed'}</p>
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
        <ErrorModal opened={this.state.editReportSummaryError} type="warning" message={this.state.editReportSummaryErrorMessage}
                    title="Error"
                    callback={() => this.setState({editReportSummaryError: false, editReportSummaryErrorMessage: ''})}/>
        <ErrorModal opened={this.state.editReportSummarySuccess} type="success" message="Your report was edited"
                    title="Success" callback={() => this.setState({editReportSummarySuccess: false})}/>
      </div>
    )
  }
}

ReactMixin(AdminReportSummaryEdit.prototype, TrackerReactMixin);


export default AdminReportSummaryEdit;
