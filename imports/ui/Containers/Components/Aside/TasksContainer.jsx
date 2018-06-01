import {Meteor} from 'meteor/meteor';
import {withTracker} from 'meteor/react-meteor-data';
import Tasks from "/imports/ui/Components/Aside/Tasks";

export default TasksContainer = withTracker(() => {
    const tasksHandler = Meteor.subscribe('alerts');
    const loading = !tasksHandler.ready();
    const tasks = UserTasks.find({}, {$sort: {addedOn: -1}}).fetch();
    return {
        loading,
        tasks
    };
})(Tasks)