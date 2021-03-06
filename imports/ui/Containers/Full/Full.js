import React, {Component} from 'react';
import Spinner from 'react-spinkit';

import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {Link, Switch, Route, Redirect} from 'react-router-dom'
import Sidebar from '/imports/ui/Components/Sidebar/Sidebar';
import Breadcrumb from '/imports/ui/Components/Breadcrumb/Breadcrumb';
import Aside from '/imports/ui/Components/Aside/Aside';
import Footer from '/imports/ui/Components/Footer/Footer';

import Dashboard from '/imports/ui/Components/Dashboard'
import HeaderContainer from "/imports/ui/Containers/Components/HeaderContainer";
import ReportAdd from "/imports/ui/Components/Reports/ReportAdd";
import ReportsOverviewContainer from "/imports/ui/Containers/Components/Reports/ReportsOverviewContainer";
import ReportEditContainer from "/imports/ui/Containers/Components/Reports/ReportEditContainer";

import UsersOverviewContainer from "/imports/ui/Containers/Components/Users/UsersOverviewContainer";

import routePermissions from '/imports/route-permissions';
import ProfileEdit from "/imports/ui/Components/Profile/ProfileEdit";
import ProfileView from "/imports/ui/Components/Profile/ProfileView";
import AddService from "/imports/ui/Components/ThirdParty/AddService";

import AdminReportsOverviewContainer
    from "/imports/ui/Containers/Components/Reports/Admin/AdminReportsOverviewContainer";
import AdminReportViewContainer from "/imports/ui/Containers/Components/Reports/Admin/AdminReportViewContainer";
import AdminReportSummaryEditContainer
    from "/imports/ui/Containers/Components/Reports/Admin/AdminReportSummaryEditContainer";
import AdminReportVotingContainer from "/imports/ui/Containers/Components/Reports/Admin/AdminReportVotingContainer";

import ReportSummaryViewContainer from "/imports/ui/Containers/Components/Reports/ReportSummaryViewContainer";
import ReportSummaryOverviewContainer from "/imports/ui/Containers/Components/Reports/ReportSummaryOverviewContainer";
import ReportViewContainer from "/imports/ui/Containers/Components/Reports/ReportViewContainer";
import AdminUserProfileEdit from "../../Components/Profile/Admin/AdminUserProfileEdit";

class Full extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialized: false
        }
    }

    render() {
        if (!this.props.currentUser) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;

        const paths = this.props.history.location.pathname.split('/');
        if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
            if (!routePermissions.admin.includes(paths[1])) return <Redirect to="/dashboard"/>
        }

        if (Roles.userIsInRole(Meteor.userId(), ['council'])) {
            if (!routePermissions.council.includes(paths[1])) return <Redirect to="/dashboard"/>
        }

        if (Roles.userIsInRole(Meteor.userId(), ['developer'])) {
            if (!routePermissions.developer.includes(paths[1])) return <Redirect to="/dashboard"/>
        }

        if (Roles.userIsInRole(Meteor.userId(), ['maintainer'])) {
            if (!routePermissions.maintainer.includes(paths[1])) return <Redirect to="/dashboard"/>
        }

        if (Roles.userIsInRole(Meteor.userId(), ['contributor'])) {
            if (!routePermissions.contributor.includes(paths[1])) return <Redirect to="/dashboard"/>
        }

        return (
            <div className="app">
                <HeaderContainer {...this.props} />
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb history={this.props.history}/>
                        <div className="container-fluid">
                            <Switch>
                                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>

                                <Route exact path="/council/users/edit/:id" name="User edit"
                                       component={AdminUserProfileEdit}/>

                                <Route exact path="/council/users" name="Users overview"
                                       component={UsersOverviewContainer}/>

                                <Route exact path="/council/reports" name="Reports overview"
                                       component={AdminReportsOverviewContainer}/>
                                <Route exact path="/council/reports/view/:id" name="Report View"
                                       component={AdminReportViewContainer}/>
                                <Route exact path="/council/reports/edit/:id" name="Report Summary Edit"
                                       component={AdminReportSummaryEditContainer}/>
                                <Route exact path="/council/reports/vote/:id" name="Report Voting"
                                       component={AdminReportVotingContainer}/>

                                <Route exact path="/report-summaries" name="Report Summaries Overview"
                                       component={ReportSummaryOverviewContainer}/>
                                <Route exact path="/report-summaries/view/:id" name="Report Summary"
                                       component={ReportSummaryViewContainer}/>

                                <Route exact path="/reports" name="Reports Overview"
                                       component={ReportsOverviewContainer}/>
                                <Route exact path="/reports/add" name="Add Report" component={ReportAdd}/>
                                <Route path="/reports/edit/:id" name="Modify Report" component={ReportEditContainer}/>
                                <Route path="/reports/view/:id" name="Reports Overview"
                                       component={ReportViewContainer}/>

                                <Route exact path="/profile/edit" name="Edit Profile" component={ProfileEdit}/>
                                <Route exact path="/profile" name="View Profile" component={ProfileView}/>
                                <Route exact path="/third-party/auth/:service" name="Third Party Add"
                                       component={AddService}/>

                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </div>
                    </main>
                    <Aside/>
                </div>
                <Footer/>
            </div>
        );
    }
}

Full.propTypes = {
    history: PropTypes.object.isRequired
};

export default FullContainer = withTracker(({id}) => {
    Meteor.user();
    return {
        currentUser: Meteor.user()
    };
})(Full);
