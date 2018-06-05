import faker from "faker";
import roles from '../../imports/roles';

class User {
    constructor(server) {
        this.users = {
            developer: [],
            council: [],
            maintainer: [],
            admin: [],
            contributor: []
        };

        this.lastUser = {};
    }

    setServer(server) {
        this.server = server;
    }

    add(role) {
        if(roles.indexOf(role) >= 0) {
            const userObject = {
                username: faker.internet.userName(),
                password: 'Test1234',
                email: faker.internet.email()
            };

            const userId = this.server.execute((userObject, role) => {
                const userId = Accounts.createUser(userObject);
                Meteor.users.update({_id: userId}, {
                    $set: {
                        roles: [role],
                        "emails.0.verified": true
                    }
                });

                return userId

            }, userObject, role);

            userObject._id = userId;
            userObject.role = role;

            this.users[role].push(userObject);

            this.lastUser = userObject;
            return userObject
        }
    }

    getUsersInRole(role) {
        return roles.indexOf(role) ? this.users[role] : [];
    }

    getLastUser() {
        return this.lastUser;
    }
}

export default new User();