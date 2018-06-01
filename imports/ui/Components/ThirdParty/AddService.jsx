import React, {Component} from 'react';
import ErrorModal from "/imports/ui/Components/ErrorModal";
import {Route, Redirect} from 'react-router';
import Spinner from 'react-spinkit';

class AddService extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            added: false,
            addServiceError: false,
            addServiceErrorMessage: '',
            addServiceSuccess: false,
        }
    }

    componentDidUpdate() {
        if (this.state.initialized) return null;

        this.setState({initialized: true});
        const searchQuery = this.props.history.location.search.replace('?', '');
        const parsedQuery = new URLSearchParams(searchQuery);
        Meteor.call('addSlackServiceData', parsedQuery.get('code'), (err, res) => {
            if (err) {
                this.setState({editReportError: true, editReportErrorMessage: err.reason});
            } else {
                if (res.error) {
                    this.setState({editReportError: true, editReportErrorMessage: res.error});
                } else {
                    this.setState({editReportSuccess: true});
                }
            }
        });
    }

    render() {
        const {history} = this.props;

        if (!Meteor.user()) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;

        if (this.state.editReportSuccess) return <Redirect to="/profile"/>;

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-pencil"> </i> Verifying your data
                            </div>
                            <div className="card-block">
                                Please wait
                            </div>
                        </div>
                    </div>
                </div>
                <ErrorModal
                    opened={this.state.editReportError}
                    disableCancel={true}
                    confirmMessage="Close"
                    type="warning"
                    message={this.state.editReportErrorMessage}
                    title="Error"
                    callback={() => this.setState({editReportError: false, editReportErrorMessage: ''})}/>
                <ErrorModal
                    opened={this.state.editReportSuccess}
                    type="success"
                    message="Your report was edited"
                    title="Success"
                    disableCancel={true}
                    callback={() => this.setState({editReportSuccess: false})}/>
            </div>
        )
    }
}

export default AddService;
