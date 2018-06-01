module.exports = function () {
    this.Then(/^a user has been added$/, function () {
        const added = server.execute(function () {
            return Meteor.users.find().count();
        });

        expect(added).toEqual(1);
    });
};