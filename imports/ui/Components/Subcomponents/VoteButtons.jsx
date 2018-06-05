import React, {Component} from 'react';
import PropTypes from 'prop-types';

class VoteButtons extends Component {

    voteButtons() {
        try {
            const {selectedVote, voteCallback} = this.props;

            const start = 1;
            const end = 10;

            const buttons = [];

            for (let i = start; i <= end; i++) {
                if (selectedVote === i) {
                    buttons.push(<button key={`vote-${i}`} className={`btn btn-block btn-sm btn-success vote-${i}`}><i
                        className="fa fa-check-square"> </i> {i}
                    </button>);
                } else {
                    buttons.push(<button key={`vote-${i}`} onClick={e => voteCallback(i)}
                                         className={`btn btn-block btn-sm btn-primary vote-${i}`}>
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

    render() {
        console.log('VoteButtons', this.props);
        return (
            <div>
                {this.voteButtons()}
            </div>
        )
    }
}

VoteButtons.propTypes = {
    selectedVote: PropTypes.any.isRequired,
    voteCallback: PropTypes.func.isRequired
};

export default VoteButtons;
