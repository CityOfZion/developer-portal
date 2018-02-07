import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Updates from "/imports/ui/components/aside/Updates";

export default UpdatesContainer = withTracker(() => {
  const updatesHandler = Meteor.subscribe('alerts');
  const loading = !updatesHandler.ready();
  const updates = UpdateMessages.find({}, {$sort: {insertedOn: -1}}).fetch();
  return {
    loading,
    updates
  };
})(Updates);