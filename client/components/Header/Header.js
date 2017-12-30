import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import Initicon from 'react-initicon';
import moment from 'moment';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      subscription: {
        initialized: false,
        unreadMessages: Meteor.subscribe('unreadMessages'),
        unreadAlerts: Meteor.subscribe('unreadAlerts'),
        reportSummary: Meteor.subscribe('currentSummary')
      },
      dropdownOpen: false
    };
  }
  
  componentWillUnmount() {
    this.state.subscription.unreadMessages.stop();
    this.state.subscription.unreadAlerts.stop();
    this.state.subscription.reportSummary.stop();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.reportSummary() && !this.state.initialized) {
      this.setState({
        report: this.reportSummary(),
        initialized: true
      });
    }
  }
  
  reportSummary() {
    return ReportSummaries.findOne({});
  }
  
  unreadMessages() {
    return Messages.find({messages: {$elemMatch: {read: false}}}).fetch();
  }
  
  unreadAlertsCount() {
    return Alerts.find({}).fetch().length;
  }
  
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  adminMenu() {
    return <ul className="nav navbar-nav d-md-down-none">
      <li className="nav-item">
        <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
      </li>
      <li className="nav-item px-3">
        <a className="nav-link" href="/">Dashboard</a>
      </li>
      <li className="nav-item px-3">
        <a className="nav-link" href="#">Users</a>
      </li>
      <li className="nav-item px-3">
        <a className="nav-link" href="#">Settings</a>
      </li>
    </ul>
  }
  
  developerMenu() {
    return <ul className="nav navbar-nav d-md-down-none">
      <li className="nav-item">
        <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
      </li>
      <li className="nav-item px-3">
        <a className="nav-link" href="/">Dashboard</a>
      </li>
    </ul>
  }
  
  countdownTimer() {
    if(!this.state.report) return '';
    let timeRemaining = 0;
    let string = '';
    const now = moment();
    console.log(this.state.report.reportsEndDate);
    if(!Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
      const endDate = moment(this.state.report.reportsEndDate);
      const diff = endDate - now;
      const remaining = moment.duration(diff, 'milliseconds');
      string = <Link className="btn btn-danger mr-2" to="/reports/add">Report submission ends in: {remaining.days()} days {remaining.hours()} hours {remaining.minutes()} mins {remaining.seconds()} sec</Link>;
    } else {
      if(!this.state.report.votingCloseDate) {
        string = <Link className="btn btn-danger mr-2" to="/council/reports">Voting is open</Link>;
      } else {
        const endDate = moment(this.state.report.votingCloseDate);
        const diff = endDate - now;
        const timeRemaining = moment.duration(diff, 'milliseconds');
        string = <Link className="btn btn-danger mr-2" to="/admin/reports">Voting ends in: {timeRemaining.days()} days {timeRemaining.hours()} hours {timeRemaining.minutes()} mins {timeRemaining.seconds()} sec</Link>;
      }
    }
    return string;
  }
  
  userIcon() {
    if(Meteor.user().profile && Meteor.user().profile.slack) {
      return <img src={Meteor.user().profile.slack.user.image_32} />
    } else {
      return <Initicon
        size={40}
        text={Meteor.user().username}
        seed={20}
        single={false}
      />
    }
  }
  
  render() {
    if(!Meteor.user()) return <div></div>;
    
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" onClick={this.mobileSidebarToggle}>&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        {Roles.userIsInRole(Meteor.userId(), ['council', 'admin']) ? this.adminMenu() : this.developerMenu()}
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">{this.countdownTimer()}</li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-bell"></i><span className="badge badge-pill badge-danger">{this.unreadAlertsCount()}</span></a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-list"></i></a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-location-pin"></i></a>
          </li>
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                {this.userIcon()}
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center"><strong>Account</strong></DropdownItem>

                <DropdownItem><i className="fa fa-bell-o"></i> Updates<span className="badge badge-info">42</span></DropdownItem>
                <DropdownItem><i className="fa fa-envelope-o"></i> Messages {this.unreadMessages().length > 0 ? <span className="badge badge-success">{this.unreadMessages().length}</span> : ''}</DropdownItem>
                <DropdownItem><i className="fa fa-tasks"></i> Tasks<span className="badge badge-danger">42</span></DropdownItem>
                <DropdownItem><i className="fa fa-comments"></i> Comments<span className="badge badge-warning">42</span></DropdownItem>

                <DropdownItem header className="text-center"><strong>Settings</strong></DropdownItem>

                <DropdownItem onClick={e => this.props.history.push('/profile')}><i className="fa fa-user"></i>Profile</DropdownItem>
                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                <DropdownItem><i className="fa fa-usd"></i> Payments<span className="badge badge-default">42</span></DropdownItem>
                <DropdownItem><i className="fa fa-file"></i> Projects<span className="badge badge-primary">42</span></DropdownItem>
                <DropdownItem divider />
                <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
                <DropdownItem onClick={e => Meteor.logout(() => this.props.history.push('/login'))}><i className="fa fa-lock"></i> Logout</DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="nav-item d-md-down-none">
            <button className="nav-link navbar-toggler aside-menu-toggler" type="button" onClick={this.asideToggle}>&#9776;</button>
          </li>
        </ul>
      </header>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired
};

ReactMixin(Header.prototype, TrackerReactMixin);

export default Header;
