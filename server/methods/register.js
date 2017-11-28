Meteor.methods({
  isUsernameTaken(username) {
    return Meteor.users.find({"profile.username": username}).count() > 1;
  },
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    } else {
      return false;
    }
  }
});