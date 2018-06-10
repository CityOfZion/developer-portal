import React, {Component} from 'react';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import PropTypes from 'prop-types';

class ProfileOverview extends Component {

    render() {
        const {history} = this.props;

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <i className="fa fa-pencil"> </i> Viewing your profile
                            </div>
                            <div className="card-block">
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label">Username</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{Meteor.user().username}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Email</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{Meteor.user().emails[0].address}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Wallet
                                        Address</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{Meteor.user().profile.mainWalletAddress}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Optional Wallet
                                        Address</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{Meteor.user().profile.optionalWalletAddress}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">First
                                        Name</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{Meteor.user().profile.firstName}</p>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 form-control-label" htmlFor="text-input">Last
                                        Name</label>
                                    <div className="col-md-9">
                                        <p className="form-control-static">{Meteor.user().profile.lastName}</p>
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

ProfileOverview.propTypes = {
    history: PropTypes.object.isRequired
};

export default ProfileOverview;
