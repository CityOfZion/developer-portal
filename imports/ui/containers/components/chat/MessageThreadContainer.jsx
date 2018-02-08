import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import MessageThread from '/imports/ui/components/chat/MessageThread';

export default MessageThreadContainer = withTracker(props => {
  const messagesHandle = Meteor.subscribe('messagesById', props.match.params.id);
  
  const loading = !messagesHandle.ready();
  const messages = UserMessages.find({}).fetch();
  
  return {
    loading,
    messages
  };
})(MessageThread);