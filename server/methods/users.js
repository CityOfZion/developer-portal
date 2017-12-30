Meteor.methods({
  editProfile(profile) {
    try {
      const result = Meteor.users.update({_id: Meteor.userId()}, {$set: {profile: profile}});
      return {result};
    } catch(e) {
      return {error: e.message}
    }
  },
  addSlackServiceData(code) {
    try {
      const auth = HTTP.get(`https://slack.com/api/oauth.access?client_id=${Meteor.settings.private.slack.clientId}&client_secret=${Meteor.settings.private.slack.secret}&code=${code}`);
      
      if (auth.data.error) {
        return {error: auth.data.error};
      }
  
      const result = Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.slack": auth.data}});

      return {result};
    } catch(e) {
      return {error: e.message};
    }
  },
  registerUser(options) {
    try {
      const userId = Accounts.createUser(options);
      return {result: userId};
    } catch(e) {
      return {error: e.message};
    }
  }
});