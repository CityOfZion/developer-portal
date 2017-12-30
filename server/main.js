import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Accounts.urls.resetPassword = (token) => Meteor.absoluteUrl(`reset-password/${token}`);
  Accounts.urls.verifyEmail = (token) => Meteor.absoluteUrl(`verify-email/${token}`);
  Accounts.urls.enrollAccount = (token) => Meteor.absoluteUrl(`enroll-account/${token}`);
  Accounts.onCreateUser(function(options, user) {
    console.log(options, user);
    user.roles = ['developer'];
    return user;
  });
  Accounts.validateLoginAttempt(function(options) {
    // If the login has failed, just return false.
    if (!options.allowed) {
      return false;
    }
    
    if (options.user.emails[0].verified === true) {
      return true;
    } else {
      throw new Meteor.Error('email-not-verified', 'You must verify your email address before you can log in');
    }
    
  });
});
