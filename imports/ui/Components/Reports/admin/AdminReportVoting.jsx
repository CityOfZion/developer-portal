import React, {Component} from 'react';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import {replaceURLWithHTMLLinks} from "/imports/helpers/helpers";
import showdown from 'showdown';
import DOMPurify from 'dompurify';
import Spinner from 'react-spinkit';

class AdminReportVoting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            currentReportIndex: 0,
            currentReport: false
        }
    }

    currentReport(props = false) {
        try {
            const {reportSummary} = props || this.props;
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
                initialized: true
            });
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    vote(amount) {
        Meteor.call('addVoteToReport', this.props.match.params.id, this.state.currentReport.user.id, amount, (err, res) => {
            this.setState({
                initialized: false
            });
            const report = this.currentReport();

            this.setState({currentReport: report, initialized: false})
        })
    }

    getVote(votes) {
        try {
            for (let i = 0; i < votes.length; i++) {
                if (votes[i].userId === Meteor.userId()) return votes[i].vote;
            }
            return votes;
        } catch (e) {
            return 0;
        }
    }

    voteButtons(votes) {
        try {
            const start = 1;
            const end = 10;

            const userVotes = votes.filter(vote => {
                if (vote.reportUserId === this.state.currentReport.user.id) {
                    return vote;
                }
            });

            const buttons = [];

            let voted = 0;
            userVotes.some((vote) => {
                if (vote.userId === Meteor.userId()) {
                    voted = vote.vote;
                    return true;
                }
            });

            for (let i = start; i <= end; i++) {
                if (voted > 0 && voted === i) {
                    buttons.push(<button key={`vote-${i}`} className="btn btn-block btn-sm btn-success"><i
                        className="fa fa-check-square"> </i> {i}
                    </button>);
                } else {
                    buttons.push(<button key={`vote-${i}`} onClick={e => this.vote(i)}
                                         className="btn btn-block btn-sm btn-primary">
                        <i
                            className="fa fa-square-o"> </i> {i}
                    </button>);
                }
            }

            return buttons;
        } catch (e) {
            return <div></div>
        }
    }

    userReports(reports) {
        const buttons = [];
        reports.map((rep, index) => {
            const voted = this.getVote(this.props.reportSummary.votes);
            if (voted > 0) {
                buttons.push(<button key={`select-${index}`} onClick={e => this.setState({
                    currentReportIndex: index,
                    currentReport: reports[index]
                })} className="btn btn-block btn-sm btn-success"><i
                    className="fa fa-check-square"> </i> {rep.user.username}
                </button>);
            } else {
                buttons.push(<button key={`select-${index}`} onClick={e => this.setState({
                    currentReportIndex: index,
                    currentReport: reports[index]
                })} className="btn btn-block btn-sm btn-primary">
                    <i
                        className="fa fa-square-o"> </i> {rep.user.username}
                </button>);
            }
        });

        return buttons;
    }

    render() {
        const {history, reportSummary} = this.props;
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
                                        {this.userReports(reportSummary.reports)}
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

export default AdminReportVoting;
