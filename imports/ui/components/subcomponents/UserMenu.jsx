import React, {Component} from 'react';

const styles = {
  navbarBrand: {
    padding: 0,
    paddingLeft: '15px',
    paddingRight: '15px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  logo: {
    paddingLeft: '5px',
    paddingRight: '5px',
    minHeight: '90%'
  },
  userMenu: {
    link: {
      padding: '0'
    },
    dropdownMenu: {
      position: 'absolute',
      right: 0,
      left: 'auto'
    }
  }
};

class UserMenu extends Component {
  render() {
    return (
      <div className="navbar-custom-menu pull-right">
        <ul className="nav navbar-nav">
          <li className="dropdown messages-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-envelope-o"></i>
            </a>
            <ul className="dropdown-menu">
              <li className="header"></li>
              <li className="footer"><a href="#">See All Messages</a></li>
            </ul>
          </li>
          <li className="dropdown notifications-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-bell-o"></i>
            </a>
            <ul className="dropdown-menu">
              <li className="header"></li>
              <li className="footer"><a href="#">View all</a></li>
            </ul>
          </li>
          <li className="dropdown tasks-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-flag-o"></i>
            </a>
            <ul className="dropdown-menu">
              <li className="header"></li>
              <li className="footer">
                <a href="#">View all tasks</a>
              </li>
            </ul>
          </li>
          <li className="dropdown user user-menu" style={styles.userMenu.dropdownMenu}>
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" style={styles.userMenu.link}>
              <img
                src="https://secure.gravatar.com/avatar/0af7b7ad19f3a0c5b9e977b842e13c23.jpg?s=32&amp;d=https%3A%2F%2Fa.slack-edge.com%2F66f9%2Fimg%2Favatars%2Fava_0017-32.png"
                className="user-image" alt="User Image"/>
              <span className="hidden-xs">Michael de Wal</span>
            </a>
            <ul className="dropdown-menu">
              <li className="user-header">
                <img
                  src="https://secure.gravatar.com/avatar/0af7b7ad19f3a0c5b9e977b842e13c23.jpg?s=192&amp;d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0017-192.png"
                  className="img-circle" alt="User Image"/>
                
                <p>
                  Michael de Wal
                  <small>michaeldewal@gmail.com</small>
                  <small>Role: admin</small>
                </p>
              </li>
              <li className="user-footer">
                <div className="pull-left">
                  <a href="#" className="btn btn-default btn-flat">Profile</a>
                </div>
                <div className="pull-right">
                  <a href="#" className="btn btn-default btn-flat sign-out">Sign out</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>)
  }
}

export default UserMenu;