import React, {Component} from 'react';
import ErrorModal from "/imports/ui/Components/ErrorModal";
import moment from 'moment';
import Spinner from 'react-spinkit';

class AdminReportSummaryEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            editReportSummaryError: false,
            editReportSummaryErrorMessage: '',
            editReportSummarySuccess: false,
            totalReward: 0,
            summaryId: ''
        }
    }

    componentWillReceiveProps(props) {
        if (props.reportSummaries.length > 0 && props.reportSummaries[0].totalReward !== this.state.totalReward && !this.state.initialized) {
            this.setState({
                totalReward: props.reportSummaries[0].totalReward,
                summaryId: props.reportSummaries[0]._id,
                initialized: true
            });
        }
    }

    resetForm() {
        this.setState({totalReward: 0});
    }

    completeDistribution() {
        Meteor.call('completeDistribution', this.props.match.params.id, (err, res) => {
            console.log(err, res);
        })
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
        const report = reportSummaries && reportSummaries[0] ? reportSummaries[0] : false;

        if (!report) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-pencil"> </i> Edit report summary for
                                week {moment(report.reportsEndDate).subtract(1, 'd').isoWeek()}
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
                                        {!report.distributionCompleted && !report.votingOpen && report.votingCompleted ?
                                            <button type="button" className="btn btn-sm btn-primary"
                                                    onClick={e => this.completeDistribution()}><i
                                                className="fa fa-dot-circle-o"> </i> Set distribution as completed
                                            </button> : ''}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Reward
                                        amount</label>
                                    <div className="col-md-9">
                                        {!report.distributionCompleted ?
                                            <input type="text" id="amount" name="amount" className="form-control"
                                                   onChange={e => this.setState({totalReward: e.currentTarget.value})}
                                                   value={this.state.totalReward}
                                                   placeholder={this.state.totalReward || 'Fill in a reward'}/> : this.state.totalReward}
                                    </div>
                                </div>
                            </div>
                            {!report.distributionCompleted ?
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-sm btn-primary"
                                            onClick={e => this.submitForm()}><i
                                        className="fa fa-dot-circle-o"> </i> Submit
                                    </button>
                                    <button type="reset" className="btn btn-sm btn-danger"
                                            onClick={e => this.resetForm()}><i
                                        className="fa fa-ban"> </i> Reset
                                    </button>
                                </div> : ''}
                        </div>
                    </div>
                </div>
                <ErrorModal
                    opened={this.state.editReportSummaryError}
                    type="warning"
                    message={this.state.editReportSummaryErrorMessage}
                    title="Error"
                    callback={() => this.setState({editReportSummaryError: false, editReportSummaryErrorMessage: ''})}/>
                <ErrorModal
                    opened={this.state.editReportSummarySuccess}
                    type="success"
                    message="The report summary was edited"
                    title="Success"
                    callback={() => this.setState({editReportSummarySuccess: false})}/>
            </div>
        )
    }
}

export default AdminReportSummaryEdit;
