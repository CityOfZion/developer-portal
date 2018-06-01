Meteor.publish('getPublicProfileById', function (userId) {
    Meteor.users.find({
        _id: userId
    }, {
        fields: {
            username: 1,
            emails: 0
        }
    });
});

Meteor.publish('userList', function () {
    if (Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
        return Meteor.users.find({},
            {
                $sort: {
                    username: 1
                }
            }
        );
    }
});

Meteor.publish('userProfile', function (id) {
    if (Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
        return Meteor.users.find({
            _id: id
        });
    }
});