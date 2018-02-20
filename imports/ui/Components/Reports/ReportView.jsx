import React, { Component } from 'react';
import moment from 'moment';
import {replaceURLWithHTMLLinks} from "/imports/helpers/helpers";
import showdown from 'showdown';
import Spinner from 'react-spinkit';
import DOMPurify from 'dompurify';

class ReportView extends Component {
  
  render() {
    const {history} = this.props;
    const converter = new showdown.Converter({
      simplifiedAutoLink: true,
      excludeTrailingPunctuationFromURLs: true,
      openLinksInNewWindow: true,
      simpleLineBreaks: true,
    });
    const report = this.props.reports && this.props.reports[0] ? this.props.reports[0] : false;
  
    if(!report) return <div style={{height: '80vh', display:'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner name="ball-triangle-path" /></div>;
    
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-file-text-o"></i> You are viewing your report for week {moment(report.reportedOn).isoWeek()}
              </div>
              <div className="card-header">
                Status: {report.status}
              </div>
              <div className="card-header">
                Reward: {report.rewardAmount ? report.rewardAmount : 'Not yet rewarded'}
              </div>
              <div className="card-header">
                Date reported: {moment(report.reportedOn).format('YYYY-MM-DD HH:mm:ss')}
              </div>
              <div className="card-header">
                Last updated: {moment(report.updatedOn).format('YYYY-MM-DD HH:mm:ss')}
              </div>
              <div className="card-block" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(converter.makeHtml(report.content))}} />
              <div className="card-footer">
                {report.status === 'reported' ?
                <button className="btn btn-sm btn-primary" onClick={e => history.push('/reports/edit/' + this.props.match.params.id)}><i
                  className="fa fa-pencil"> </i> Edit
                </button> : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReportView;
