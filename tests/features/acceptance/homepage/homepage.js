module.exports = function () {
    this.Then('the login form is visible', function () {
        browser.waitForVisible(`input#user`, 5000);
        browser.waitForVisible(`input#pass`, 5000);
        browser.waitForVisible(`button.login`, 5000);
        browser.waitForVisible(`button.forgot-password`, 5000);
    })
}