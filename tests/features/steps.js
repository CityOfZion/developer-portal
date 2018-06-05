import faker from 'faker';
import moment from 'moment';
import user from './user-fixtures';

const pages = {
    home: '/',
    dashboard: '/dashboard',
    login: '/login',
    register: '/register',
    reports: '/reports',
    reportAdd: '/reports/add',
    councilReports: '/council/reports'
};

const password = faker.internet.password();

const forms = {
    register: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: password,
        passwordRepeat: password
    },
    reportAdd: {
        report: "add"
    },
    reportEdit: {
        report: "edit"
    }
};

const getPage = page => pages[page] || '/';
const getPageUrl = page => `http://localhost:4000${getPage(page)}`;

module.exports = function () {

    this.Given(/^There is a (.*) button$/, function (buttonName) {
        browser.waitForVisible(`button.${buttonName}`, 5000);
    });

    this.When(/^I click the (.*) button$/, function (buttonName) {
        browser.waitForVisible(`button.${buttonName}`, 5000);
        browser.click(`button.${buttonName}`);
    });

    this.Then(/^I am redirected to (.*) page$/, function (page) {
        browser.pause(1000);

        expect(getPageUrl(page)).toEqual(browser.getUrl());
    });

    this.Given(/^I navigate to the (.*) page$/, function (page) {
        browser.pause(1000);
        browser.url(getPageUrl(page));
    });

    this.Given(/^I fill in the (.*) form$/, function (form) {
        Object.entries(forms[form]).forEach((data) => {
            const [index, value] = data;
            browser.waitForVisible(`#${index}`, 1000);
            browser.setValue(`#${index}`, value);
        })
    });

    this.Then(/^I see a (.*) modal$/, function (modalType) {
        browser.waitForVisible(`.modal-${modalType}`, 2000);
    });

    this.Given(/^a (.*) user exists$/, function (role) {
        const userObject = user.add(role);
        expect(userObject).not.toBe(undefined);
    });

    this.When(/^the (.*) logs in$/, function (userType) {
        const lastUser = user.getLastUser();

        server.call('logout');
        client.execute(function () {
            Meteor.logout();
        });

        browser.pause(500);

        server.call('login', {
            user: {email: lastUser.email},
            password: lastUser.password
        });

        browser.url(getPageUrl('login'));

        browser.waitForVisible('#user', 5000);
        browser.waitForVisible('#pass', 5000);
        browser.setValue('#user', lastUser.username);
        browser.setValue('#pass', lastUser.password);

        browser.click('button.login')
    })
};