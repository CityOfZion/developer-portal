import React, {Component} from 'react';

const styles = {
  breadCrumbs: {
    margin: 0,
    padding: 0
  },
  panel: {
    marginBottom: '5px',
    padding: 0
  },
  panelBody: {
    padding: '5px'
  }
}

class BreadCrumbs extends Component {
  render() {
    return (
      <div className="panel panel-default" style={styles.panel}>
        <div className="panel-body" style={styles.panelBody}>
          <ol className="breadcrumb" style={styles.breadCrumbs}>
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Library</a></li>
            <li className="breadcrumb-item active">Data</li>
          </ol>
        </div>
      </div>
    );
  }
}

export default BreadCrumbs;