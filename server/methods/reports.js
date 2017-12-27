import { check } from 'meteor/check';
import moment from 'moment';

Meteor.methods({
  addReport(content) {
    try {
      check(content, String);
      
      if(!Roles.userIsInRole(Meteor.userId(), ['developer', 'council', 'admin'])) {
        return {error: 'userNotAuthorized'}
      }
      
      const startOfWeek = moment().startOf('isoWeek');
      const endOfWeek = moment(startOfWeek).endOf('isoWeek');
      
      const query = {userId: Meteor.userId(), reportedOn: {$gte: startOfWeek.toDate(), $lt: endOfWeek.toDate()}};
      const report = Reports.find(query).count();
      
      if (report) {
        return {error: 'Report already submitted'};
      }
  
      const reportedOn = new Date();
      
      const data = {
        content,
        reportedOn: reportedOn,
        userId: Meteor.userId(),
        status: 'reported',
        votes: []
      };
      
      const result = Reports.insert(data);
      
      ReportSummaries.update({reportsEndDate: {$gte: reportedOn}, reportsStartDate: {$lte: reportedOn}}, {$inc: {totalReports: 1}});
      
      return {result};
    } catch(e) {
      return {error: e.message};
    }
  },
  editReport(id, content) {
    try {
      check(id, String);
      check(content, String);
      
      if(!Roles.userIsInRole(Meteor.userId(), ['developer', 'council', 'admin'])) {
        return {error: 'userNotAuthorized'}
      }
      
      const report = Reports.findOne({_id: id, userId: Meteor.userId()});
  
      if (!report) {
        return {error: 'Invalid user'};
      }
  
      if (report.week < moment().isoWeek()) {
        return {error: 'This week is not available for editing'};
      }
  
      const result = Reports.update({_id: id}, {$set: {content, updatedOn: new Date()}});
  
      return {result};
    } catch(e) {
      return {error: e.message};
    }
  },
  updateReportStatusById(id, status) {
    try {
      check(id, String);
      check(status, String);
  
      if(!Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
        return {error: 'userNotAuthorized'}
      }
  
      const result = Reports.update({_id: id}, {$set: {status: status, updatedOn: new Date()}});
  
      return {result};
    } catch (e) {
      return {error: e.message};
    }
  },
  addVoteToReport(id, vote) {
    try {
      check(id, String);
      check(vote, Number);
  
      if (!Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
        return {error: 'userNotAuthorized'}
      }
  
      if (vote < 0 || vote > 10) {
        return {error: 'invalidVoteAmount'};
      }
  
      const hasVoted = Reports.find({_id: id, 'votes.userId': Meteor.userId()}).count();
  
      let result = null;
  
      // If user has voted already, update vote instead
      if (hasVoted) {
        result = Reports.update({_id: id, 'votes.userId': Meteor.userId()}, {$set: {'votes.$.vote': vote}});
      } else {
        result = Reports.update({_id: id}, {$push: {votes: {userId: Meteor.userId(), vote: vote}}});
      }
  
      const report = Reports.findOne({_id: id});
      const summary = ReportSummaries.findOne({reportsEndDate: {$gte: report.reportedOn}, reportsStartDate: {$lte: report.reportedOn}});
      
      // closing date isnt set yet
      if(!summary.votingCloseDate) {
        const totalReportsVoted = Reports.find({'votes.userId': Meteor.userId()}).count();
        const totalReports = summary.totalReports;
  
        // If true then start countdown for others to vote
        if (totalReports === totalReportsVoted) {
          ReportSummaries.update({_id: summary._id}, {$set: {votingCloseDate: moment(moment().add(5, 'days')).toDate()}});
        }
      }
  
      return {result};
    } catch (e) {
      return {error: e.message};
    }
  }
});