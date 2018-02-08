import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Alerts from '/imports/ui/Components/Aside/Alerts';

export default AlertsContainer = withTracker(() => {
  const alertsHandler = Meteor.subscribe('alerts');
  const loading = !alertsHandler.ready();
  const alerts = UserAlerts.find({}, {$sort: {alertedOn: -1}}).fetch();
  return {
    loading,
    alerts
  };
})(Alerts);