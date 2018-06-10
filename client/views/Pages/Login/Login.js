import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import PropTypes from "prop-types";
import {withTracker} from 'meteor/react-meteor-data';
import ErrorModal from "../../../../imports/ui/Components/ErrorModal";

class Login extends Component {

    constructor() {
        super();

        this.state = {
            loginError: false,
            accountActivateError: false,
            loginErrorMessage: '',
            user: '',
            password: ''
        }
    }

    componentWillReceiveProps(props) {
        console.log('location', props.location, this.state.accountActivateError)
        if (props.location.emailIsVerified === false && this.state.accountActivateError === false) {
            this.setState({accountActivateError: true});
        }
    }

    login() {
        Meteor.loginWithPassword(this.state.user, this.state.password, (err, res) => {
            if (err) this.setState({loginError: true, loginErrorMessage: err.reason});
            else this.props.history.push('/dashboard')
        })
    }

    render() {
        // check if user is actually logged in
        if (this.props.currentUser) return <Redirect to="/dashboard"/>;
        const {currentUser} = this.props;

        return (
            <div className="app flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card-group mb-0">
                                <div className="card p-4 login">
                                    <div className="card-block">
                                        <h1>Login</h1>
                                        {currentUser && currentUser.emails[0].verified === false ? 'You are currently logged in, but your email address has not been verified. Please check your email and verify your email address' :
                                            <div>
                                                <p className="text-muted">Sign In to your account</p>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-addon"><i
                                                        className="icon-user"></i></span>
                                                    <input type="text" id="user" className="form-control"
                                                           placeholder="Username/Email" autoComplete="off"
                                                           onChange={e => this.setState({user: e.currentTarget.value})}/>
                                                </div>
                                                <div className="input-group mb-4">
                                                    <span className="input-group-addon"><i
                                                        className="icon-lock"></i></span>
                                                    <input type="password" id="pass" className="form-control"
                                                           placeholder="Password" autoComplete="off"
                                                           onChange={e => this.setState({password: e.currentTarget.value})}/>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <button type="button" className="btn btn-primary px-4 login"
                                                                onClick={e => this.login()}>Login
                                                        </button>
                                                    </div>
                                                    <div className="col-6 text-right">
                                                        <button type="button"
                                                                className="btn btn-link px-0 forgot-password"
                                                                onClick={() => this.props.history.push('/forgot-password')}>Forgot
                                                            password?
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="card card-inverse card-primary py-5 register" style={{width: '100%'}}>
                                    <div className="card-block text-center">
                                        <div>
                                            <h2>Sign up</h2>
                                            <p>To use this portal a profile is required, at first we ask for the most
                                                basic information, but if you want more options, more information will
                                                be required.</p>
                                            <button type="button" className="btn btn-primary active mt-3 register"
                                                    onClick={() => this.props.history.push('/register')}>Register Now!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ErrorModal
                    opened={this.state.loginError}
                    type="warning"
                    disableCancel={true}
                    message={this.state.loginErrorMessage}
                    title="Error"
                    callback={() => this.setState({loginError: false, loginErrorMessage: ''})}/>
                <ErrorModal
                    opened={this.state.accountActivateError}
                    type="error"
                    disableCancel={true}
                    message="The activation code provided is not valid or already used"
                    title="Error"
                    callback={() => this.setState({loginErrorMessage: false})}/>
            </div>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object.isRequired,
    currentUser: PropTypes.object
};

export default Login;
