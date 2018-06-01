import {Meteor} from 'meteor/meteor';
import {addReportSummary} from "../imports/reports";

Meteor.startup(() => {

    Accounts.emailTemplates.siteName = "City of Zion - Development Portal";
    Accounts.emailTemplates.from = `${Accounts.emailTemplates.siteName} <development@cityofzion.io>`;

    Accounts.emailTemplates.verifyEmail.subject = function () {
        return '[CoZ] Developer Portal - Verification Email';
    };

    Accounts.urls.resetPassword = (token) => Meteor.absoluteUrl(`reset-password/${token}`);
    Accounts.urls.verifyEmail = (token) => Meteor.absoluteUrl(`verify-email/${token}`);
    Accounts.urls.enrollAccount = (token) => Meteor.absoluteUrl(`enroll-account/${token}`);
    Accounts.onCreateUser(function (options, user) {
        user.roles = ['developer'];
        return user;
    });
    Accounts.validateLoginAttempt(function (options) {
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

    addReportSummary();
});
