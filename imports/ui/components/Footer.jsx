import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="col-xs-12 main-footer">
        <div className="pull-right hidden-xs">
          <b>Version</b> 0.0.0
        </div>
        <strong>Copyright © 2017 <a href="https://www.cityofzion.io">City of Zion</a>.</strong> All rights
        reserved.
      </footer>
    );
  }
}

export default Footer;