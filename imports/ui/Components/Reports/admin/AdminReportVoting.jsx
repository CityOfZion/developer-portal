import React, {Component} from 'react';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import {replaceURLWithHTMLLinks} from "/imports/helpers/helpers";
import showdown from 'showdown';

class AdminReportVoting extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      currentReportIndex: 0,
      currentReport: false
    }
  }
  
  componentWillReceiveProps(props) {
    const reports = props.reports && props.reports[0] ? props.reports[0] : {reports: []};
    const report = reports.reports[this.state.currentReportIndex];
    if (!this.state.initialized && report) {
      this.setState({
        currentReport: report,
        initialized: true
      });
    }
  }
  
  vote(amount) {
    Meteor.call('addVoteToReport', this.state.currentReport._id, amount, (err, res) => {
      this.setState({
        initialized: false
      });
      const reports = this.props.reports && this.props.reports[0] ?  this.props.reports[0] : {reports: []};
      const report = reports.reports[this.state.currentReportIndex];
      this.setState({currentReport: report, initialized: false})
    })
  }
  
  getVote(votes) {
    for (let i = 0; i < votes.length; i++) {
      if (votes[i].userId === Meteor.userId()) return votes[i].vote;
    }
    
    return 0;
  }
  
  voteButtons(votes) {
    const start = 1;
    const end = 10;
    
    const buttons = [];
    
    const voted = this.getVote(votes);
    
    for (let i = start; i <= end; i++) {
      if (voted > 0 && voted === i) {
        buttons.push(<button key={`vote-${i}`} className="btn btn-block btn-sm btn-success"><i
          className="fa fa-check-square"> </i> {i}
        </button>);
      } else {
        buttons.push(<button key={`vote-${i}`} onClick={e => this.vote(i)} className="btn btn-block btn-sm btn-primary">
          <i
            className="fa fa-square-o"> </i> {i}
        </button>);
      }
    }
    
    return buttons;
  }
  
  userReports(reports) {
    const buttons = [];
    reports.map((rep, index) => {
      const voted = this.getVote(rep.votes);
      if (voted > 0) {
        buttons.push(<button key={`select-${index}`} onClick={e => this.setState({currentReportIndex: index, currentReport: reports[index]})} className="btn btn-block btn-sm btn-success"><i
          className="fa fa-check-square"> </i> {rep.user.username}
        </button>);
      } else {
        buttons.push(<button key={`select-${index}`} onClick={e => this.setState({currentReportIndex: index, currentReport: reports[index]})} className="btn btn-block btn-sm btn-primary">
          <i
            className="fa fa-square-o"> </i> {rep.user.username}
        </button>);
      }
    });
    
    return buttons;
  }
  
  render() {
    const {history} = this.props;
    const reports = this.props.reports && this.props.reports[0] ? this.props.reports[0] : {reports: []};
    const converter = new showdown.Converter();
    return (
      <div>
        {!this.state.currentReport ? '' :
          <div className="animated fadeIn">
            <div className="row">
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Report from user
                  </div>
                  <div className="card-block">
                    {this.userReports(reports.reports)}
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-file-text-o"></i> You are viewing <strong>{this.state.currentReport.user.username}'s</strong> report for week {this.state.currentReport.week}
                  </div>
                  <div className="card-header">
                    Status: {this.state.currentReport.status}
                  </div>
                  <div className="card-header">
                    Date reported: {moment(this.state.currentReport.reportedOn).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                  <div className="card-header">
                    Last updated: {moment(this.state.currentReport.updatedOn).format('YYYY-MM-DD HH:mm:ss')}
                  </div>
                  <div className="card-block"
                       dangerouslySetInnerHTML={{__html: replaceURLWithHTMLLinks(converter.makeHtml(this.state.currentReport.content))}}/>
                  <div className="card-footer">
                  
                  </div>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Vote
                  </div>
                  <div className="card-block">
                    {this.voteButtons(this.state.currentReport.votes)}
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

export default AdminReportVoting;
