import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import UsersOverview from "../../../Components/Users/UsersOverview";

export default UsersOverviewContainer = withTracker(() => {
  const usersHandler = Meteor.subscribe('userList');
  
  const loading = !usersHandler.ready();
  const users = Meteor.users.find({}, {$sort: {username: 1}}).fetch();
  
  return {
    loading,
    users
  };
})(UsersOverview);