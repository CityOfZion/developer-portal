import React, {Component} from 'react';
import showdown from 'showdown';
import moment from 'moment';
import DOMPurify from 'dompurify';
import FoldingCard from "/imports/ui/Components/Widgets/FoldingCard";
import Spinner from 'react-spinkit';

class ReportSummaryView extends Component {

    overview = reportSummary => {
        return <div className="col-lg-4">
            <div className="card">
                <div className="card-header">
                    <i className="fa fa-eye"> </i> Viewing report summary for
                    week {moment(reportSummary.reportsEndDate).subtract(1, 'd').isoWeek()}
                </div>
                <div className="card-block">
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label">Report Start Date</label>
                        <div className="col-md-9">
                            <p className="form-control-static">{moment(reportSummary.reportsStartDate).format('YYYY-MM-DD HH:mm')}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label">Report End Date</label>
                        <div className="col-md-9">
                            <p className="form-control-static">{moment(reportSummary.reportsEndDate).format('YYYY-MM-DD HH:mm')}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-3 form-control-label">Amount of reports</label>
                        <div className="col-md-9">
                            <p className="form-control-static">{reportSummary.reports.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    };

    reportsView = reports => {

        const converter = new showdown.Converter();
        converter.setFlavor('github');

        return <div className="col-lg-8">
            <div className="card">
                <div className="card-header">
                    <i className="fa fa-files-o"> </i> Reports
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

    render() {
        const {reportSummary} = this.props;

        if (!reportSummary) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;
        return (
            <div className="animated fadeIn">
                <div className="row">
                    {reportSummary ? this.overview(reportSummary) : ''}
                    {reportSummary ? this.reportsView(reportSummary.reports) : ''}
                </div>
            </div>
        )
    }
}

export default ReportSummaryView;
