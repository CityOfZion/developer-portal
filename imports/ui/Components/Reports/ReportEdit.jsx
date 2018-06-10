import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import ErrorModal from "/imports/ui/Components/ErrorModal";
import showdown from 'showdown';
import Spinner from 'react-spinkit';
import DOMPurify from 'dompurify';
import moment from "moment/moment";
import PropTypes from 'prop-types';

class ReportEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            editReportError: false,
            editReportErrorMessage: '',
            editReportSuccess: false,
            content: ''
        }
    }

    componentWillReceiveProps(props) {
        if (props.reportSummary && props.reportSummary[0] && !this.state.initialized) {
            this.setState({initialized: true, content: props.reportSummary[0].reports[0].content});
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    submitForm() {
        if (this.state.content.length > 0) {
            Meteor.call('editReport', this.props.match.params.id, this.state.content, (err, res) => {
                if (err) {
                    this.setState({editReportError: true, editReportErrorMessage: err.reason});
                } else {
                    if (res.error) {
                        this.setState({editReportError: true, editReportErrorMessage: res.error});
                    } else {
                        this.props.history.push(`/reports/view/${this.props.match.params.id}`)
                    }
                }
            })
        }
    }

    render() {
        const {history, reportSummary} = this.props;

        if (reportSummary.votingOpen) return <Redirect to="/"/>;

        const converter = new showdown.Converter();
        converter.setFlavor('github');

        const report = reportSummary && reportSummary[0] && reportSummary[0].reports && reportSummary[0].reports[0] ? reportSummary[0].reports[0] : false;

        if (!report) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-pencil"> </i> Edit report for
                                week {moment(report.reportedOn).isoWeek()}
                            </div>
                            <div className="card-block">
                                <form action="" method="post">
                                    <div className="form-group">
                                        <label htmlFor="nf-password">Report</label>
                                        <textarea id="report" name="report" rows="9" className="form-control"
                                                  placeholder="Enter your report here"
                                                  onChange={e => this.setState({content: e.currentTarget.value})}
                                                  value={this.state.content}>
                      {this.state.content}
                    </textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-sm btn-primary save"
                                        onClick={e => this.submitForm()}><i
                                    className="fa fa-dot-circle-o"> </i> Save
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-eye"> </i> Example output
                            </div>
                            <div className="card-block">
                                <div className="form-group"
                                     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(converter.makeHtml(this.state.content))}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <ErrorModal
                    opened={this.state.editReportError} type="warning"
                    message={this.state.editReportErrorMessage}
                    disableCancel={true}
                    title="Error"
                    callback={() => this.setState({editReportError: false, editReportErrorMessage: ''})}/>
                <ErrorModal
                    opened={this.state.editReportSuccess}
                    type="success"
                    message="Your report was edited"
                    disableCancel={true}
                    title="Success" callback={() => this.setState({editReportSuccess: false})}/>
            </div>
        )
    }
}

ReportEdit.propTypes= {
    history: PropTypes.object.isRequired,
    reportSummary: PropTypes.object.isRequired
};

export default ReportEdit;
