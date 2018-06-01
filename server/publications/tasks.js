Meteor.publish('tasks', () => {
    return UserTasks.find({
        userId: Meteor.userId()
    });
});

Meteor.publish('unreadTasks', () => {
    return UserTasks.find({
        userId: Meteor.userId(),
        read: false
    });
});