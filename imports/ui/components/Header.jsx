import React, {Component} from 'react';
import UserMenu from "./subcomponents/UserMenu";

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
  }
};

class Header extends Component {
  render() {
    return (
     <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="collapsed navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-6" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="#" className="navbar-brand" style={styles.navbarBrand}><img style={styles.logo} src="/images/Coz-logo.svg" />Developer<br />Portal</a></div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><a href="#">Home</a></li>
              <li><a href="#">Link</a></li>
              <li><a href="#">Link</a></li>
            </ul>
            <UserMenu/>
          </div>
        </div>
      </nav>)
  }
}

export default Header;