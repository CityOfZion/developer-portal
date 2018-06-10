import roles from '/imports/roles';

const userProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    mainWalletAddress: {
        type: String,
        optional: true
    },
    optionalWalletAddress: {
        type: String,
        optional: true
    },
    github: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

const paymentSchema = new SimpleSchema({
    reportSummary: {
        type: String
    },
    paymentDate: {
        type: Date
    },
    amount: {
        type: Number
    },
    neoPrice: {
        type: Number
    },
    transactionId: {
        type: String
    },
    periodStart: {
        type: Date
    },
    periodEnd: {
        type: Date
    },
    comment: {
        type: String,
        optional: true
    }
});

const userSchema = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        optional: true
    },
    receivedPayments: {
        type: [paymentSchema],
        optional: true
    },
    profile: {
        type: userProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: [String],
        optional: true,
        allowedValues: roles
    }
});

Meteor.users.attachSchema(userSchema);