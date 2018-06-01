import React, {Component} from 'react';
import Spinner from 'react-spinkit';
import {Progress} from 'reactstrap';
import {Meteor} from "meteor/meteor";

class ReportRewardTotals extends Component {

    constructor(props) {
        super(props);

        this.state = {
            totals: false
        };

        Meteor.call('getReportsRewards', (err, res) => {
            if (res !== false) {
                this.setState({totals: res});
            }
        })
    }

    render() {

        if (this.state.totals === false) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;

        return <div className="col-sm-6 col-md-2">
            <div className="card">
                <div className="card-block">
                    <div className="h1 text-muted text-right mb-2">
                        <i className="icon-wallet"></i>
                    </div>
                    <div className="h4 mb-0">{this.state.totals} NEO</div>
                    <small className="text-muted text-uppercase font-weight-bold">Rewarded</small>
                    <Progress className="progress progress-xs mt-3 mb-0" color="info" value="100"/>

                </div>
            </div>
        </div>
    }
}

export default ReportRewardTotals;