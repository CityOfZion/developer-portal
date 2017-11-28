import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Accounts.urls.resetPassword = (token) => Meteor.absoluteUrl(`reset-password/${token}`);
  Accounts.urls.verifyEmail = (token) => Meteor.absoluteUrl(`verify-email/${token}`);
  Accounts.urls.enrollAccount = (token) => Meteor.absoluteUrl(`enroll-account/${token}`);
});
