import React, {Component} from 'react';
import {Progress} from 'reactstrap';
import Spinner from 'react-spinkit';
import PropTypes from 'prop-types';

class ReportSummaryWidget extends Component {

    render() {

        if (!this.props.reports) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;

        return <div className="col-sm-6 col-md-2">
            <div className="card">
                <div className="card-block">
                    <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speech"></i>
                    </div>
                    <div className="h4 mb-0">{this.props.reports.length}</div>
                    <small className="text-muted text-uppercase font-weight-bold">Reports</small>
                    <Progress className="progress progress-xs mt-3 mb-0" color="info" value="25"/>
                </div>
            </div>
        </div>
    }
}

ReportSummaryWidget.propTypes = {
    reports: PropTypes.array.isRequired
}

export default ReportSummaryWidget;