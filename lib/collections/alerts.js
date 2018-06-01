const alertSchema = new SimpleSchema({
    title: {
        label: 'Title',
        type: String
    },
    content: {
        label: 'Content',
        type: String
    },
    userId: {
        label: 'User ID',
        type: String
    },
    alertedOn: {
        label: 'Alerted On',
        type: Date
    },
    read: {
        label: 'Read',
        type: Boolean
    }
});

UserAlerts = new Meteor.Collection('alerts');
UserAlerts.attachSchema(alertSchema);