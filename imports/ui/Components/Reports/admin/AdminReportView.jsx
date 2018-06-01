import React, {Component} from 'react';
import ErrorModal from "/imports/ui/Components/ErrorModal";
import showdown from 'showdown';
import moment from 'moment';
import DOMPurify from 'dompurify';
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
            summaryId: '',
            reportsWidth: 12
        };

        this.allowedReportsWidthValues = [6, 7, 8, 9, 10, 11, 12];
    }

    getVoteAverage = votes => {
        return this.getVoteTotals(votes) / votes.length;
    };

    getVoteTotals = votes => {
        return votes.reduce((a, b) => {
            return a + b.vote;
        }, 0)
    };

    componentWillReceiveProps(props) {
        try {
            const totals = props.reportSummary.votes.reduce((a, b) => {
                return a.vote + b.vote;
            });
            this.setState({totalVotes: totals})
        } catch (e) {
            console.log(e.message);
        }
    }

    changeReportsWidth = target => {
        if (this.allowedReportsWidthValues.includes(target)) {
            this.setState({reportsWidth: target})
        }
    };

    reportsWidthButtons = () => {
        return this.allowedReportsWidthValues.map(width => {
            return (width === this.state.reportsWidth) ?
                <button type="button" className="btn btn-success"
                        onClick={e => this.changeReportsWidth(width)}>{width}</button> :
                <button type="button" className="btn btn-secondary"
                        onClick={e => this.changeReportsWidth(width)}>{width}</button>
        });
    };

    overview = reportSummary => {
        return <div className="col-lg-3">
            <div className="card">
                <div className="card-header">
                    <i className="fa fa-eye"> </i> Viewing report summary for
                    week {moment(reportSummary.reportsEndDate).subtract(1, 'd').isoWeek()}
                </div>
                <div className="card-block">
                    <div className="form-group row">
                        <label className="col-md-5 form-control-label">Report End Date</label>
                        <div className="col-md-7">
                            <p className="form-control-static">{moment(reportSummary.reportsEndDate).format('YYYY-MM-DD HH:mm')}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-5 form-control-label">Voting End Date</label>
                        <div className="col-md-7">
                            <p className="form-control-static">{reportSummary.votingCloseDate ? moment(reportSummary.votingCloseDate).format('YYYY-MM-DD HH:mm') : 'Not decided yet'}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-5 form-control-label">Total rewards</label>
                        <div className="col-md-7">
                            <p className="form-control-static">{reportSummary.totalReward}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-5 form-control-label">Amount of reports</label>
                        <div className="col-md-7">
                            <p className="form-control-static">{reportSummary.reports.length}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-5 form-control-label">Voting</label>
                        <div className="col-md-7">
                            <p className="form-control-static">
                                {reportSummary.votingOpen ? 'Open for voting' : 'Voting is closed'}<br/>
                                {reportSummary.votingCompleted ? 'Voting is completed' : 'Voting is incomplete'}
                            </p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-5 form-control-label">Distribution</label>
                        <div className="col-md-7">
                            <p
                                className="form-control-static">{reportSummary.distributionCompleted ? 'Distributed' : 'Not yet distributed'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    };

    reportsView = reports => {

        const converter = new showdown.Converter();
        converter.setFlavor('github');

        const className = `col-lg-${this.state.reportsWidth}`;

        return <div className={className}>
            <div className="card">
                <div className="card-header">
                    <i className="fa fa-files-o"> </i> Reports
                    <span className="pull-right">{this.reportsWidthButtons()}</span>
                </div>
                <div className="card-block">
                    {reports.map((report, index) =>
                        <FoldingCard
                            key={index}
                            header={`${report.user.username} reported on ` + moment(report.reportedOn).format('YYYY-MM-DD HH:mm')}
                            content={DOMPurify.sanitize(converter.makeHtml(report.content))}
                        />
                    )}

                </div>
            </div>
        </div>
    };

    distributionView = reportSummary => {

        const headers = ['Username', 'Vote avg', 'Vote %', 'Reward', 'address'];
        const items = reportSummary.reports.map((report, index) => {
            const userVotes = reportSummary.votes.filter(vote => vote.reportUserId === report.user.id);
            const voteAverage = this.getVoteAverage(userVotes);
            const votePercentage = this.getVoteTotals(userVotes) / this.state.totalVotes * 100;
            const neoRewarded = Math.ceil(reportSummary.totalReward * votePercentage / 100);
            return <tr key={index}>
                <td>{report.user.username}</td>
                <td>{isNaN(voteAverage) ? '-' : voteAverage.toFixed(2)}</td>
                <td>{isNaN(votePercentage) ? '-' : votePercentage.toFixed(2) + '%'}</td>
                <td>{isNaN(neoRewarded) ? '-' : neoRewarded}</td>
                <td>{report.user.mainWalletAddress ? report.user.mainWalletAddress : 'No address specified'}</td>
            </tr>
        });

        return <div className="col-lg-9">
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
    };

    render() {
        const {history, reportSummary} = this.props;

        if (!reportSummary) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;
        return (
            <div className="animated fadeIn">
                <div className="row">
                    {reportSummary ? this.overview(reportSummary) : ''}
                    {reportSummary ? this.distributionView(reportSummary) : ''}
                    {reportSummary ? this.reportsView(reportSummary.reports) : ''}
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
