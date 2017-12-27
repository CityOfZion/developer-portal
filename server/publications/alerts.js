Meteor.publish('unreadAlerts', function() {
  return Alerts.find({userId: Meteor.userId()});
})