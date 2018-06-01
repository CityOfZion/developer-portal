Meteor.publish('unreadAlerts', function () {
    return UserAlerts.find({
        userId: Meteor.userId(),
        read: false
    });
});

Meteor.publish('alerts', function () {
    return UserAlerts.find({
        userId: Meteor.userId()
    });
});