import React, {Component} from 'react';
import Spinner from 'react-spinkit';
import { Progress } from 'reactstrap';

class ReportRewardTotals extends Component {
  
  render() {
    
    if(!this.props.reports) return <div style={{height: '80vh', display:'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner name="ball-triangle-path" /></div>;
    
    let amount = 0;
    this.props.reports.map(report => amount += report.neoRewarded ? report.neoRewarded : 0);
    
    return <div className="col-sm-6 col-md-2">
      <div className="card">
        <div className="card-block">
          <div className="h1 text-muted text-right mb-2">
            <i className="icon-wallet"></i>
          </div>
          <div className="h4 mb-0">{amount} NEO</div>
          <small className="text-muted text-uppercase font-weight-bold">Rewarded</small>
          <Progress className="progress progress-xs mt-3 mb-0" color="info" value="100" />

        </div>
      </div>
    </div>
  }
}

export default ReportRewardTotals;