import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';
// Containers
import Full from './containers/Full/'
// Views
import LoginContainer from '/imports/ui/containers/LoginContainer'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'
import ForgotPassword from "./views/Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./views/Pages/ResetPassword/ResetPassword";

const history = createBrowserHistory();

function isLoggedIn() {
  return(Meteor.userId() || (Meteor.user() && Meteor.user().emails[0].verified === true));
}

Meteor.startup(() => {
  render(
    <Router history={history}>
      <Switch>
        <Route exact path="/login" name="Login Page" render={props =>
          !isLoggedIn() ? <LoginContainer {...props}/> : <Redirect to="/dashboard"/>
        }/>
        <Route exact path="/forgot-password" name="Forgot Password Page" render={props =>
          !isLoggedIn() ? <ForgotPassword {...props} /> : <Redirect to="/dashboard"/>
        }/>
        <Route path="/reset-password/:token" name="Reset Password Page" render={props => <ResetPassword {...props} /> }/>
        <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>}/>
        <Route exact path="/404" name="Page 404" component={Page404}/>
        <Route exact path="/500" name="Page 500" component={Page500}/>
        <Route path="/verify-email/:token" name="Verify account" render={
          props => {
            return Accounts.verifyEmail(props.match.params.token) ? <Redirect to="/dashboard"/> : <Redirect to="/login"/>
          }
        }/>
        <Route path="/" name="Home" render={props => (
          !isLoggedIn() ? <Redirect to="/login"/> : <Full {...props}/>
        )}/>
      </Switch>
    </Router>,
    document.getElementById('root'));
});
