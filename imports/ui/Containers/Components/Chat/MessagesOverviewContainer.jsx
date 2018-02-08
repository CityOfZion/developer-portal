import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MessagesOverview from '/imports/ui/Components/Chat/MessagesOverview';

export default MessageOverviewContainer = withTracker(() => {
  const messagesHandle = Meteor.subscribe('messages');
  
  const loading = !messagesHandle.ready();
  const messages = UserMessages.find({}).fetch();
  
  return {
    loading,
    messages
  };
})(MessagesOverview);