import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'

class Sidebar extends Component {

    handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    }

    activeRoute(routeName) {
        return this.props.history.location && this.props.history.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    }

    adminMenu() {
        return <li className={'nav-item ' + this.activeRoute("/council/reports")}>
            <NavLink to={'/council/reports'} className="nav-link" activeClassName="active"><i
                className="fa fa-eye"></i> Reports Overview</NavLink>
        </li>
    }

    developerMenu() {
        return <li className={`${this.activeRoute("/reports")} open`}>
            <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i
                className="fa fa-files-o"></i> Reports</a>
            <ul className="nav-dropdown-items">
                <li className={`${this.activeRoute("/report-summaries")} nav-item`}>
                    <NavLink to={'/report-summaries'} className="nav-link" activeClassName="active"><i
                        className="fa fa-eye"></i> Report Summary Overview</NavLink>
                </li>
                <li className={`${this.activeRoute("/reports")} nav-item`}>
                    <NavLink to={'/reports'} className="nav-link" activeClassName="active"><i
                        className="fa fa-eye"></i> Reports Overview</NavLink>
                </li>
                <li className={`${this.activeRoute("/reports/add")} nav-item`}>
                    <NavLink to={'/reports/add'} className="nav-link" activeClassName="active"><i
                        className="fa fa-plus-square"></i> Add Report</NavLink>
                </li>
            </ul>
        </li>
    }

    render() {
        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink to={'/dashboard'} className="nav-link" activeClassName="active">
                                <i className="icon-speedometer"> </i> Dashboard <span
                                className="badge badge-info">NEW</span>
                            </NavLink>
                        </li>
                        <li className="divider"></li>
                        <li className="nav-title">
                            Main Menu
                        </li>
                        {Roles.userIsInRole(Meteor.userId(), ['council', 'admin']) ? this.adminMenu() : this.developerMenu()}
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Sidebar;
