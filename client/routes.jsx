import React from 'react';
import MainLayout from "/imports/ui/MainLayout";

Router.route('/', {
  onBeforeAction() {
    if (Meteor.loggingIn() || Meteor.userId()) {
      this.redirect('/registered');
    }
    this.next();
    
  },
  action() {
    ReactLayout.render(MainLayout);
  }
});