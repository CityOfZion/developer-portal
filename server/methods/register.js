import {check} from 'meteor/check';

Meteor.methods({
    usernames() {
        const users = Meteor.users.find({}, {_id: 0, createdAt: 0, services: 0, emails: 0, roles: 0}).fetch();
        return users.map(user => {
            return user.username
        });
    },
    sendVerificationLink(userId) {
        try {
            check(userId, String);
            this.unblock();
            return Accounts.sendVerificationEmail(userId);

        } catch (e) {
            console.log(e);
        }
    }
});