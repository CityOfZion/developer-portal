import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import MessagesOverview from "../../../imports/ui/components/chat/MessagesOverview";
import Header from "../../components/Header/Header";
import MessageThread from "../../../imports/ui/components/chat/MessageThread";
import ReportAdd from "../../../imports/ui/components/reports/ReportAdd";
import ReportsOverview from "../../../imports/ui/components/reports/ReportsOverview";
import ReportView from "../../../imports/ui/components/reports/ReportView";
import ReportEdit from "../../../imports/ui/components/reports/ReportEdit";
import AdminReportsOverview from "../../../imports/ui/components/reports/admin/AdminReportsOverview";
import AdminReportSummaryEdit from "../../../imports/ui/components/reports/admin/AdminReportSummaryEdit";
import AdminReportVoting from "../../../imports/ui/components/reports/admin/AdminReportVoting";
import AdminReportView from "../../../imports/ui/components/reports/admin/AdminReportView";

import routePermissions from '/imports/route-permissions';
import ProfileEdit from "../../../imports/ui/components/profile/ProfileEdit";
import ProfileOverview from "../../../imports/ui/components/profile/ProfileOverview";
import ProfileView from "../../../imports/ui/components/profile/ProfileView";
import AddService from "../../../imports/ui/components/third-party/AddService";

class Full extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    }
  }
  
  render() {
  
    const paths = this.props.history.location.pathname.split('/');
    if(Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      if(!routePermissions.admin.includes(paths[1])) return <Redirect to="/"/>
    }
  
    if(Roles.userIsInRole(Meteor.userId(), ['council'])) {
      if(!routePermissions.council.includes(paths[1])) return <Redirect to="/"/>
    }
    
    if(Roles.userIsInRole(Meteor.userId(), ['developer'])) {
      if(!routePermissions.developer.includes(paths[1])) return <Redirect to="/"/>
    }
    
    return (
      <div className="app">
        <Header {...this.props} />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb history={this.props.history}/>
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                
                <Route exact path="/chats" name="Chats Overview" component={MessagesOverview}/>
                <Route path="/chats/:id" name="Chats" component={MessageThread}/>
                
                <Route exact path="/council/reports" name="Reports overview" component={AdminReportsOverview}/>
                <Route exact path="/council/reports/view/:id" name="Report View" component={AdminReportView}/>
                <Route exact path="/council/reports/edit/:id" name="Report Summary Edit" component={AdminReportSummaryEdit}/>
                <Route exact path="/council/reports/vote/:id" name="Report Voting" component={AdminReportVoting}/>
                
                <Route exact path="/reports" name="Reports overview" component={ReportsOverview}/>
                <Route exact path="/reports/add" name="Add Report" component={ReportAdd}/>
                <Route path="/reports/edit/:id" name="Modify Report" component={ReportEdit}/>
                <Route path="/reports/:id" name="Reports Overview" component={ReportView}/>
  
                <Route exact path="/profile/edit" name="Edit Profile" component={ProfileEdit}/>
                <Route exact path="/profile" name="View Profile" component={ProfileView}/>
                <Route exact path="/third-party/auth/:service" name="Third Party Add" component={AddService}/>
                
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

Full.propTypes = {
  history: PropTypes.object.isRequired
};

export default FullContainer = withTracker(({ id }) => {
  Meteor.user();
  return {
    currentUser: Meteor.user()
  };
})(Full);
