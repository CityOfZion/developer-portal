import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from 'meteor/react-meteor-data';
import ErrorModal from "../../../../imports/ui/components/ErrorModal";

class ForgotPassword extends Component {
  
  constructor() {
    super();
    
    this.state = {
      emailSent: false,
      resetError: false,
      resetErrorMessage: '',
      email: '',
      password: ''
    }
  }
  
  sendEmail() {
    Accounts.forgotPassword({email: this.state.email}, (err, res) => {
      if(err) this.setState({loginError: true, loginErrorMessage: err.reason});
      else this.setState({emailSent: true});
    })
  }
  
  render() {
 
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="card-block">
                    <h1>Forgot Password</h1>
                    {this.state.emailSent ? 'An email has been sent to your email address, please check your inbox' :
                      <div>
                        <p className="text-muted">Fill in your email address</p>
                        <div className="input-group mb-3">
                          <span className="input-group-addon"><i className="icon-user"></i></span>
                          <input type="text" id="user" className="form-control" placeholder="Email" autoComplete="off" onChange={e => this.setState({email: e.currentTarget.value})}/>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <button type="button" className="btn btn-primary px-4" onClick={e => this.sendEmail()}>Send reset URL</button>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ErrorModal opened={this.state.loginError} type="warning" message={this.state.loginErrorMessage} title="Error" callback={() => this.setState({loginError: false, loginErrorMessage: ''}) } />
      </div>
    );
  }
}

export default ForgotPassword;
