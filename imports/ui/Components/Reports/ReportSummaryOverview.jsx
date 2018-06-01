import React, {Component} from 'react';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import moment from 'moment';
import ContentTable from "../Widgets/ContentTable";
import Spinner from 'react-spinkit';

class ReportSummaryOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxItemsPerPage: 1000,
            totalItems: 0,
            currentPage: 1,
            pages: 1
        }
    }

    render() {
        const {history, loading, reportSummaries} = this.props;

        if (!reportSummaries) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;

        const headers = ['Week', 'From', 'Until', 'Reports', 'Action'];
        const items = reportSummaries.map((summary, index) => {
            return (
                <tr key={summary._id}>
                    <td>{moment(summary.reportsEndDate).isoWeek()}</td>
                    <td>{moment(summary.reportsStartDate).format('YYYY/MM/DD HH:mm:ss')}</td>
                    <td>{moment(summary.reportsEndDate).format('YYYY/MM/DD HH:mm:ss')}</td>
                    <td>{summary.reports ? summary.reports.length : 0}</td>
                    <td>
                        <button className="btn btn-sm btn-primary"
                                onClick={e => history.push('/report-summaries/view/' + summary._id)}><i
                            className="fa fa-eye"> </i> View
                        </button>
                    </td>
                </tr>
            )
        });

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-align-justify"></i> Report Summaries
                            </div>
                            <div className="card-block">
                                <ContentTable
                                    headers={headers}
                                    items={items}
                                    pages={this.state.pages}
                                    currentPage={this.state.currentPage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        No filters available yet
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportSummaryOverview;
