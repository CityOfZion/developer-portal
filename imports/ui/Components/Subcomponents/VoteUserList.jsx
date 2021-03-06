import React, {Component} from 'react';
import PropTypes from 'prop-types';

class VoteUserList extends Component {

    getVote(reportUserId, votes) {
        try {
            for (let i = 0; i < votes.length; i++) {
                if (votes[i].userId === Meteor.userId() && reportUserId === votes[i].reportUserId) return votes[i].vote;
            }
            return votes;
        } catch (e) {
            return 0;
        }
    }

    render() {
        const {reports, selectCallback, votes, currentSelectedIndex} = this.props;

        console.log('votes', votes);

        const buttons = [];
        reports.map((rep, index) => {
            const active = currentSelectedIndex === index;
            if (this.getVote(rep.user.id, votes) > 0) {
                buttons.push(<button key={`select-${index}`} onClick={e => selectCallback(index)} className={`btn btn-block btn-sm ${active ? 'btn-outline-success' : 'btn-success'}`}>
                    <i className="fa fa-check-square"> </i> {rep.user.username}
                </button>);
            } else {
                buttons.push(<button key={`select-${index}`} onClick={e => selectCallback(index)} className={`btn btn-block btn-sm ${active ? 'btn-outline-warning' : 'btn-warning'}`}>
                    <i className="fa fa-square-o"> </i> {rep.user.username}
                </button>);
            }
        });

        return <div>{buttons}</div>;
    }
}

VoteUserList.propTypes = {
    reports: PropTypes.array.isRequired,
    votes: PropTypes.array.isRequired,
    selectCallback: PropTypes.func.isRequired,
    currentSelectedIndex: PropTypes.number.isRequired
};


export default VoteUserList;
