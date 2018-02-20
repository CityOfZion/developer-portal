import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactMixin from 'react-mixin';
import {TrackerReactMixin} from 'meteor/ultimatejs:tracker-react';
import { withTracker } from 'meteor/react-meteor-data';
import Initicon from 'react-initicon';
import moment from 'moment';

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
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
    Meteor.call('readAlerts', (err, res) => {
    
    })
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
        <a className="nav-link" href="/council/users">Users</a>
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
    if(!this.props.reportSummary || this.props.reportSummary.length === 0) return '';
    let timeRemaining = 0;
    let string = '';
    const now = moment();
    const reportSummary = this.props.reportSummary[0];
    if(Roles.userIsInRole(Meteor.userId(), ['developer'])) {
      const endDate = moment(reportSummary.reportsEndDate);
      const diff = endDate - now;
      const remaining = moment.duration(diff, 'milliseconds');
      console.log(this.props.currentReport);
      const linkClass = (this.props.currentReport && this.props.currentReport[0]) ? '' : 'btn btn-danger mr-2';
      const linkTo = (this.props.currentReport && this.props.currentReport[0]) ? `/reports/edit/${this.props.currentReport[0]._id}` : '/reports/add';
      string = <Link className={linkClass} to={linkTo}>Report submission ends in: {remaining.days()} days {remaining.hours()} hours {remaining.minutes()} mins</Link>;
    } else {
      if(reportSummary.votingOpen) {
        if (!reportSummary.votingCloseDate) {
          string = <Link className="btn btn-danger mr-2" to="/council/reports">Voting is open</Link>;
        } else {
          const endDate = moment(reportSummary.votingCloseDate);
          const diff = endDate - now;
          const timeRemaining = moment.duration(diff, 'milliseconds');
          string = <Link className="btn btn-danger mr-2" to="/admin/reports">Voting ends
            in: {timeRemaining.days()} days {timeRemaining.hours()} hours {timeRemaining.minutes()} mins</Link>;
        }
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
    
    const unreadMessageCount = this.props.unreadMessages.length;
    const unreadAlertsCount = this.props.unreadAlerts.length;
    const unreadCommentsCount = this.props.unreadComments.length;
    const unreadTasksCount = this.props.unreadTasks.length;
    
    return (
      <header className="app-header navbar">
  
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" onClick={this.mobileSidebarToggle}>&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        {Roles.userIsInRole(Meteor.userId(), ['council', 'admin']) ? this.adminMenu() : this.developerMenu()}
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">{this.countdownTimer()}</li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#" onClick={this.asideToggle}><i className="icon-bell"></i>{unreadAlertsCount > 0 ? <span className="badge badge-pill badge-danger">{unreadAlertsCount}</span> : ''}</a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-list"></i></a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href="#"><i className="icon-location-pin"></i></a>
          </li>
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup={true} aria-expanded={this.state.dropdownOpen}>
                {this.userIcon()}
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center"><strong>Account</strong></DropdownItem>

                <DropdownItem onClick={this.asideToggle}><i className="fa fa-bell-o"></i> Updates {unreadAlertsCount > 0 ? <span className="badge badge-info">{unreadAlertsCount}</span> : ''}</DropdownItem>
                <DropdownItem><i className="fa fa-envelope-o"></i> Messages {unreadMessageCount > 0 ? <span className="badge badge-success">{unreadMessageCount}</span> : ''}</DropdownItem>
                <DropdownItem><i className="fa fa-tasks"></i> Tasks {unreadTasksCount > 0 ? <span className="badge badge-danger">{unreadTasksCount}</span> : ''}</DropdownItem>
                <DropdownItem><i className="fa fa-comments"></i> Comments {unreadCommentsCount > 0 ? <span className="badge badge-warning">{unreadCommentsCount}</span> : ''}</DropdownItem>

                <DropdownItem header className="text-center"><strong>Settings</strong></DropdownItem>

                <DropdownItem onClick={e => this.props.history.push('/profile')}><i className="fa fa-user"></i>Profile</DropdownItem>
                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                <DropdownItem divider />
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

export default Header;
