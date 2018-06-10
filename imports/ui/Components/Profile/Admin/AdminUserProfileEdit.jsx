import React, {Component} from 'react';
import ErrorModal from "/imports/ui/Components/ErrorModal";
import roles from '/imports/roles';

class AdminUserProfileEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialized: false,
            editProfileError: false,
            editProfileErrorMessage: '',
            editReportSuccess: false,
            role: ''
        }
    }

    submitForm() {
        Meteor.call('editUserRole', this.props.match.params.id, this.state.role, (err, res) => {
            if (err) {
                this.setState({editProfileError: true, editProfileErrorMessage: err.reason});
            } else {
                if (res.error) {
                    this.setState({editProfileError: true, editProfileErrorMessage: res.error});
                } else {
                    this.setState({editReportSuccess: true});
                }
            }
        })
    }

    componentWillReceiveProps(props) {
        if (props.user && !this.state.initialized) {
            this.setState({initialized: true, role: props.currentUser.roles[0]});
        }
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    static roleOptions() {
        return roles.map((role, index) => {
            return <option value={role} key={index}>{role}</option>;
        });
    }

    render() {
        const {history, currentUser} = this.props;

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-pencil"> </i> Edit the profile of {currentUser.username}
                            </div>
                            <div className="card-block">
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Email</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{currentUser.emails[0].address}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Wallet
                                        Address</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{currentUser.profile && currentUser.profile.mainWalletAddress ? currentUser.profile.mainWalletAddress : ''}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Optional Wallet
                                        Address</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{currentUser.profile && currentUser.profile.optionalWalletAddress ? currentUser.profile.optionalWalletAddress : ''}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">First
                                        Name</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{currentUser.profile && currentUser.profile.firstName ? currentUser.profile.firstName : ''}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Last
                                        Name</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{currentUser.profile && currentUser.profile.lastName ? currentUser.profile.lastName : ''}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Role</label>
                                    <div className="col-md-9">
                                        {['council', 'admin'].includes(currentUser.roles[0]) ?
                                            <p className="form-control-static">{this.state.role}</p>
                                            :
                                            <select className="form-control" defaultValue={this.state.role} id="role"
                                                    onChange={e => {
                                                        this.setState({role: roles[e.currentTarget.selectedIndex]});
                                                    }}>
                                                {this.roleOptions()}
                                            </select>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-sm btn-primary"
                                        onClick={e => this.submitForm()}><i
                                    className="fa fa-dot-circle-o"> </i> Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ErrorModal
                    opened={this.state.editProfileError}
                    type="warning" disableCancel={true}
                    confirmText="Close"
                    message={this.state.editProfileErrorMessage}
                    title="Error"
                    callback={() => this.setState({editProfileError: false, editProfileErrorMessage: ''})}/>
                <ErrorModal
                    opened={this.state.editReportSuccess}
                    type="success"
                    message="Your profile was edited"
                    title="Success"
                    confirmText="Close"
                    disableCancel={true}
                    callback={() => this.setState({editReportSuccess: false, editProfileErrorMessage: ''})}/>
            </div>
        )
    }
}

export default AdminUserProfileEdit;
