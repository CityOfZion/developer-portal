import React, {Component} from 'react';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import showdown from 'showdown';
import DOMPurify from 'dompurify';
import Spinner from 'react-spinkit';
import VoteButtons from "../../Subcomponents/VoteButtons";
import PropTypes from 'prop-types';
import VoteUserList from "../../Subcomponents/VoteUserList";

class AdminReportVoting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            currentReportIndex: 0,
            currentReport: false,
            reportSummary: false
        }
    }

    currentReport(props = false) {
        try {
            const {reportSummary} = props || this.state;
            return reportSummary.reports[this.state.currentReportIndex];
        } catch (e) {
            return false;
        }
    }

    componentWillReceiveProps(props) {
        const report = this.currentReport(props);
        if (!this.state.initialized && report) {
            this.setState({
                currentReport: report,
                initialized: true,
                reportSummary: props.reportSummary
            });
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    vote(amount) {
        console.log('VOTING', this.state.currentReport);
        console.log('AMOUNT', amount);
        console.log('ID', this.props.match.params.id);

        Meteor.call('addVoteToReport', this.props.match.params.id, this.state.currentReport.user.id, amount, (err, res) => {

            console.log('addVoteToReport', err, res);

            this.setState({
                initialized: false
            });
            const report = this.currentReport();

            this.setState({currentReport: report, initialized: false})
        })
    }

    voteButtons(votes) {
        try {
            const userVotes = votes.filter(vote => {
                if (vote.reportUserId === this.state.currentReport.user.id) {
                    return vote;
                }
            });

            let voted = false;
            userVotes.some((vote) => {
                if (vote.userId === Meteor.userId()) {
                    voted = vote.vote;
                    return true;
                }
            });

            return <VoteButtons selectedVote={voted} voteCallback={vote => {this.vote(vote);}}/>
        } catch (e) {
            return <div></div>
        }
    }

    render() {
        const {reportSummary} = this.props;

        console.log(reportSummary);

        if (!reportSummary) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;

        const converter = new showdown.Converter();
        converter.setFlavor('github');

        return (
            <div>
                {!this.state.currentReport ? <div>Not enough information to display the voting process.</div> :
                    <div className="animated fadeIn">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="card">
                                    <div className="card-header">
                                        <i className="fa fa-align-justify"></i> Report from user
                                    </div>
                                    <div className="card-block">
                                        <VoteUserList
                                            reports={reportSummary.reports}
                                            votes={reportSummary.votes}
                                            selectCallback={index => this.setState({currentReportIndex: index, currentReport: reportSummary.reports[index]})}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="card">
                                    <div className="card-header">
                                        <i className="fa fa-file-text-o"></i> You are
                                        viewing <strong>{this.state.currentReport.user.username}'s</strong> report for
                                        week {moment(this.state.currentReport.reportedOn).isoWeek()}
                                    </div>
                                    <div className="card-header">
                                        Status: {this.state.currentReport.status}
                                    </div>
                                    <div className="card-header">
                                        Date
                                        reported: {moment(this.state.currentReport.reportedOn).format('YYYY-MM-DD HH:mm:ss')}
                                    </div>
                                    <div className="card-header">
                                        Last
                                        updated: {moment(this.state.currentReport.updatedOn).format('YYYY-MM-DD HH:mm:ss')}
                                    </div>
                                    <div className="card-block"
                                         dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(converter.makeHtml(this.state.currentReport.content))}}/>
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
                                        {this.voteButtons(reportSummary.votes)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        )
    }
}

AdminReportVoting.PropTypes = {
    reportSummary: PropTypes.object.isRequired
};

export default AdminReportVoting;
