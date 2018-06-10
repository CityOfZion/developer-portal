import React, {Component} from 'react';
import {getVoteAverage, getVoteTotals} from "/imports/helpers/votes";
import ContentTable from "../../Widgets/ContentTable";
import PropTypes from 'prop-types';

class AdminReportDistributionView extends Component {
    render() {
        const {history, reportSummary} = this.props;

        const totalVotes = reportSummary.votes.reduce((vote, value) => vote.vote + value.vote);

        console.log('totalvotes', totalVotes);

        if (!reportSummary) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;

        const headers = ['Username', 'Vote avg', 'Vote %', 'Reward', 'address'];
        const items = reportSummary.reports.map((report, index) => {
            const userVotes = reportSummary.votes.filter(vote => vote.reportUserId === report.user.id);
            const voteAverage = getVoteAverage(userVotes);
            const votePercentage = getVoteTotals(userVotes) / totalVotes * 100;
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
}

AdminReportDistributionView.propTypes = {
    history: PropTypes.object.isRequired,
    reportSummary: PropTypes.object
};

export default AdminReportDistributionView;
