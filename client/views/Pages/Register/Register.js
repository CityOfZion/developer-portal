import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ErrorModal from "../../../../imports/ui/components/ErrorModal";

class Register extends Component {
  
  constructor() {
    super();
    this.state = {
      userCreated: false,
      userCreatedError: false,
      userCreatedErrorMessage: '',
      username: '',
      password: '',
      passwordRepeat: '',
      email: '',
      usernameErrors: [],
      passwordErrors: [],
      passwordRepeatErrors: [],
      emailErrors: []
    }
  }
  
  usernameInput = value => {
    const usernameErrors = [];
    
    if(value.length < 3) {
      usernameErrors.push('Username has to be longer than 3 characters');
    }
    
    // check for invalid characters
    if(/^.*?(?=[\^!@#%&$\*:<>\?/\{\|\}]).*$/.test(value)) {
      usernameErrors.push('Username has invalid characters');
    }
  
    this.setState({usernameErrors: usernameErrors, username: value})
  };
  
  emailInput = value => {
    const emailErrors = [];
    if(!/^[A-Z0-9\._%+-]+@[A-Z0-9\.-]+\.[A-Z]{2,}$/i.test(value)) {
      emailErrors.push('Invalid email address');
    }
    
    this.setState({email: value, emailErrors: emailErrors})
  };
  
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
  
  userCreatedModalFeedback = result => {
    if(result) this.props.history.push('/login');
    else this.setState({userCreated: false});
  };
  
  userCreatedErrorModalFeedback = result => {
    this.setState({userCreatedError: false, userCreatedErrorMessage: ''});
  };
  
  register() {
    this.usernameInput(this.state.username);
    this.emailInput(this.state.email);
    this.passwordInput(this.state.password);
    this.passwordRepeatInput(this.state.passwordRepeat);
    
    if(
      this.state.usernameErrors.length === 0 &&
      this.state.emailErrors.length === 0 &&
      this.state.passwordErrors.length === 0 &&
      this.state.passwordRepeatErrors.length === 0
    ) {
      // DO SUBMIT
      Accounts.createUser({username: this.state.username, email: this.state.email, password: this.state.password}, (err, res) => {
        console.log(err, res);
        if(!err) {
          this.setState({userCreated: true});
          Meteor.call('sendVerificationLink', (err, res) => {
            if(err) this.setState({userCreatedError: true, userCreatedErrorMessage: err.reason});
            else this.setState({userCreated: true});
          })
        } else {
          this.setState({userCreatedError: true, userCreatedErrorMessage: err.reason});
        }
      })
    }
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mx-4">
                <div className="card-block p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <div className={this.state.usernameErrors.length > 0 ? "input-group mb-3 is-invalid" : "input-group mb-3"}>
                    <span className="input-group-addon"><i className="icon-user"></i></span>
                    <input type="text" className="form-control" required placeholder="Username" onChange={e => this.usernameInput(e.currentTarget.value)}/>
                  </div>
                  <div className="invalid-feedback">
                    {
                      this.state.usernameErrors.map((error, index) => <p key={index}>{error}</p>)
                    }
                  </div>
                  
                  <div className={this.state.emailErrors.length > 0 ? "input-group mb-3 is-invalid" : "input-group mb-3"}>
                    <span className="input-group-addon">@</span>
                    <input type="text" className="form-control" required placeholder="Email" onChange={e => this.emailInput(e.currentTarget.value)}/>
                  </div>
                  <div className="invalid-feedback">
                    {
                      this.state.emailErrors.map((error, index) => <p key={index}>{error}</p>)
                    }
                  </div>
                  
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
                  
                  <button type="button" className="btn btn-block btn-success" onClick={() => this.register()}>Create Account</button>
                  <button type="button" className="btn btn-block btn-primary" onClick={() => this.props.history.push('/login')}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ErrorModal type="success" opened={this.state.userCreated} message="Account successfully created, you will receive a confirmation email shortly." title="Success" callback={this.userCreatedModalFeedback}/>
        <ErrorModal type="warning" opened={this.state.userCreatedError} message={this.state.userCreatedErrorMessage} title="Error" callback={this.userCreatedErrorModalFeedback}/>
      </div>
    );
  }
}

export default Register;
