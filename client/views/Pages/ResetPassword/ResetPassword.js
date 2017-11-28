import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withTracker } from 'meteor/react-meteor-data';
import ErrorModal from "../../../../imports/ui/components/ErrorModal";

class ResetPassword extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      password: '',
      passwordRepeat: '',
      passwordErrors: [],
      passwordRepeatErrors: [],
      passwordResetError: false,
      passwordResetErrorMessage: '',
      passwordResetSuccess: false
    };
    
    console.log(props);
  }
  
  passwordInput = value => {
    const passwordErrors = [];
    
    if(value.length < 8) {
      passwordErrors.push('Passwords length has to be greater than 8');
    }
    
    this.setState({password: value, passwordErrors: passwordErrors})
    
  };
  
  passwordRepeatInput = value => {
    const passwordRepeatErrors = [];
    
    if(value !== this.state.password) {
      passwordRepeatErrors.push('Passwords do not match');
    }
    
    this.setState({passwordRepeat: value, passwordRepeatErrors: passwordRepeatErrors})
  };
  
  resetPassword() {
    this.passwordInput(this.state.password);
    this.passwordRepeatInput(this.state.passwordRepeat);
  
    if(
      this.state.passwordErrors.length === 0 &&
      this.state.passwordRepeatErrors.length === 0
    ) {
      console.log(this.props.match.params.token, this.state.password);
      Accounts.resetPassword(this.props.match.params.token, this.state.password, (err, res) => {
        if(err) this.setState({passwordResetError: true, passwordResetErrorMessage: err.reason});
        else this.setState({passwordResetSuccess: true});
      });
    }
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
                    <h1>Reset Password</h1>
                      <div>
                        <p className="text-muted">Fill in your new password</p>
                        <div className={this.state.passwordErrors.length > 0 ? "input-group mb-3 is-invalid" : "input-group mb-3"}>
                          <span className="input-group-addon"><i className="icon-lock"></i></span>
                          <input type="password" className="form-control" required placeholder="Password" onChange={e => this.passwordInput(e.currentTarget.value)}/>
                        </div>
                        <div className="invalid-feedback">
                          {
                            this.state.passwordErrors.map((error, index) => <p key={index}>{error}</p>)
                          }
                        </div>
  
                        <div className={this.state.passwordRepeatErrors.length > 0 ? "input-group mb-3 is-invalid" : "input-group mb-3"}>
                          <span className="input-group-addon"><i className="icon-lock"></i></span>
                          <input type="password" className="form-control" required placeholder="Repeat password" onChange={e => this.passwordRepeatInput(e.currentTarget.value)}/>
                        </div>
                        <div className="invalid-feedback">
                          {
                            this.state.passwordRepeatErrors.map((error, index) => <p key={index}>{error}</p>)
                          }
                        </div>
                        <button type="button" className="btn btn-block btn-success" onClick={() => this.resetPassword()}>Confirm</button>

                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ErrorModal opened={this.state.passwordResetError} type="warning" message={this.state.passwordResetErrorMessage} title="Error" callback={() => this.setState({passwordResetError: false, passwordResetErrorMessage: ''}) } />
        <ErrorModal opened={this.state.passwordResetSuccess} type="success" message="Your password has been reset, when you close this message you will be redirected" title="Success" callback={() => this.props.history.push('/login') } />
      </div>
    );
  }
}

export default ResetPassword;
