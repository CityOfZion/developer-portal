import React, {Component} from 'react';
import Spinner from 'react-spinkit';
import PropTypes from 'prop-types';

class Tasks extends Component {
    render() {
        if (this.props.loading) return <div
            style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner
            name="ball-triangle-path"/></div>;
        if (this.props.tasks.length === 0) return <div>No tasks</div>;

        return <div>
            <div className="callout m-0 py-2 text-muted text-center bg-faded text-uppercase">
                <small><b>Today</b></small>
            </div>
            <hr className="transparent mx-3 my-0"/>
            <div className="callout callout-warning m-0 py-3">
                <div>Meeting with <strong>Lucas</strong></div>
                <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 1 - 3pm</small>
                <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; Palo Alto, CA</small>
            </div>
            <hr className="mx-3 my-0"/>
        </div>
    }
}

Tasks.propTypes = {
    loading: PropTypes.bool.isRequired,
    tasks: PropTypes.array.isRequired
};

export default Tasks;