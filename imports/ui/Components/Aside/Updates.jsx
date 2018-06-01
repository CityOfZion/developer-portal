import React, {Component} from 'react';
import Spinner from 'react-spinkit';

class Updates extends Component {
    render() {
        if (this.props.loading) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;
        if (this.props.updates.length === 0) return <div>No updates</div>;

        return <div>
            <div className="callout m-0 py-2 text-center bg-danger text-uppercase border-dark">
                <small><b>Updates</b></small>
            </div>
            {this.props.updates.map((alert, index) => {
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
            })}

        </div>
    }
}

export default Updates;