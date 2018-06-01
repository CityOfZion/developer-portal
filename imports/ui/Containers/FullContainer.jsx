import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import Full from "./Full";

export default FullContainer = withTracker(({id}) => {
    const currentUser = Meteor.user();
    return {
        currentUser
    };
})(Full);