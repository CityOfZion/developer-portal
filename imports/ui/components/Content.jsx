import React, {Component} from 'react';
import BreadCrumbs from "./subcomponents/BreadCrumbs";

class Content extends Component {
  render() {
    const {content} = this.props;
    return (
      <div style={{marginTop: '55px'}}>
        <div className="col-md-2">
          <div className="panel-group">
            <div className="panel panel-primary">
              <div className="panel-heading">Panel with panel-primary class</div>
              <div className="panel-body">Panel Content</div>
            </div>
            <div className="panel panel-default">
              <div className="panel-body">Panel Content</div>
            </div>
            <div className="panel panel-default">
              <div className="panel-body">Panel Content</div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <BreadCrumbs/>
          <div className="panel-group">
            <div className="panel panel-primary">
              <div className="panel-heading">Panel with panel-primary class</div>
              <div className="panel-body">Panel Content</div>
            </div>
            <div className="panel panel-default">
              <div className="panel-body">Panel Content</div>
            </div>
            <div className="panel panel-default">
              <div className="panel-body">Panel Content</div>
            </div>
          </div>
        </div>
        <div className="col-md-2">
        </div>
      </div>
    );
  }
}

export default Content;