Meteor.methods({
    readAlerts() {
        UserAlerts.update({
            userId: Meteor.userId()
        }, {
            $set: {
                read: true
            },
            multi: true
        }, {
            multi: true
        });
    }
});