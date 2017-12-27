import React, { Component } from 'react';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import {replaceURLWithHTMLLinks} from "/imports/helpers/helpers";
import showdown from 'showdown';

class ReportView extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        report: Meteor.subscribe('reportById', this.props.match.params.id)
      }
    }
  }
  
  componentWillUnmount() {
    this.state.subscription.report.stop();
  }
  
  report() {
    return Reports.find({}).fetch();
  }
  
  render() {
    const {history} = this.props;
    const converter = new showdown.Converter();
    const report = this.report()[0] || {};
  
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
                Date reported: {moment(report.reportedOn).format('YYYY-MM-DD HH:mm:ss')}
              </div>
              <div className="card-header">
                Last updated: {moment(report.updatedOn).format('YYYY-MM-DD HH:mm:ss')}
              </div>
              <div className="card-block" dangerouslySetInnerHTML={{__html: replaceURLWithHTMLLinks(converter.makeHtml(report.content))}} />
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

ReactMixin(ReportView.prototype, TrackerReactMixin);


export default ReportView;
