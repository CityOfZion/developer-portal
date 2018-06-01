import React, {Component} from 'react';
import Spinner from 'react-spinkit';

class Alerts extends Component {

    setAlertsRead() {
        Meteor.call('readAlerts', (err, res) => {
        });
    }

    componentWillReceiveProps(props) {
        if (props.isActive === true) this.setAlertsRead();
    }

    list() {
        return this.props.alerts.map((alert, index) => {
            return <div className="mx-1" key={index}>
                <div className="message">
                    <div>
                        <small className="text-muted">System alert</small>
                        <small
                            className="text-muted float-right mt-1">{moment(alert.alertedOn).format('YYYY-MM-DD hh:mm:ss')}</small>
                    </div>
                    <div className="text-truncate font-weight-bold">{alert.title}</div>
                    <small className="text-muted">{alert.content}</small>
                </div>
                <hr/>
            </div>
        })
    }

    render() {
        if (this.props.loading) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;
        return <div>
            <div className="callout m-0 py-2 text-center bg-danger text-uppercase border-dark">
                <small><b>Alerts</b></small>
            </div>
            {this.props.alerts.length === 0 ? <div>No alerts</div> : this.list()}
        </div>
    }
}

export default Alerts;