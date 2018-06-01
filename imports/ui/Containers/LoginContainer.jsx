import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import Login from "../../../client/views/Pages/Login/Login";

export default LoginContainer = withTracker(({id}) => {
    const currentUser = Meteor.user();
    return {
        currentUser
    };
})(Login);