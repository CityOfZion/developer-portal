import React, {Component} from 'react';

class ProfileView extends Component {

    render() {
        const {history, currentUser} = this.props;

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-eye"> </i> Viewing your profile
                                <button type="button" className="btn btn-sm btn-warning pull-right"
                                        onClick={e => history.push('/profile/edit')}><i
                                    className="fa fa-pencil"> </i> Edit
                                </button>
                            </div>
                            <div className="card-block">
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">First
                                        Name</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{currentUser.profile ? currentUser.profile.firstName : 'Not filled in'}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Last
                                        Name</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{currentUser.profile ? currentUser.profile.lastName : 'Not filled in'}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label">Username</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{currentUser.username}</p>
                                    </div>
                                </div>
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
                                        <p className="form-control-static">{currentUser.profile ? currentUser.profile.mainWalletAddress : 'Not filled in'}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Optional Wallet
                                        Address</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{currentUser.profile ? currentUser.profile.optionalWalletAddress : 'Not filled in'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileView;
