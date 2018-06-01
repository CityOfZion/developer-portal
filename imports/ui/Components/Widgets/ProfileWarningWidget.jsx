import React, {Component} from 'react';
import {Progress} from 'reactstrap';
import Spinner from 'react-spinkit';

class ProfileWarningWidget extends Component {

    render() {

        if (!Meteor.user()) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;

        let percentage = 0;
        if (Meteor.user().username) percentage += 25;
        if (Meteor.user().profile) {
            if (Meteor.user().profile.firstName) percentage += 25;
            if (Meteor.user().profile.lastName) percentage += 25;
            if (Meteor.user().profile.mainWalletAddress) percentage += 25;
        }

        if (percentage === 100) return <div></div>;

        return <div className="col-sm-6 col-md-2">
            <div className="card">
                <div className="card-block">
                    <div className="h1 text-muted text-right mb-2">
                        <i className="icon-people"></i>
                    </div>
                    <div className="h4 mb-0">Profile</div>
                    <small className="text-muted text-uppercase font-weight-bold">Profile incomplete</small>
                    <Progress className="progress progress-xs mt-3 mb-0" color="danger" value={percentage}/>
                </div>
            </div>
        </div>
    }
}

export default ProfileWarningWidget;