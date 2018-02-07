import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Comments from "/imports/ui/components/aside/Comments";

export default CommentsContainer = withTracker(() => {
  const commentsHandler = Meteor.subscribe('comments');
  const loading = !commentsHandler.ready();
  const comments = UserComments.find({}, {$sort: {commentedOn: -1}}).fetch();
  return {
    loading,
    comments
  };
})(Comments);