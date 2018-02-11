import { check } from 'meteor/check';
import moment from 'moment';
import { Jobs } from 'meteor/msavin:sjobs';

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
      const report = UserReports.find(query).count();
      
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
      
      const result = UserReports.insert(data);
      
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
      
      const report = UserReports.findOne({_id: id, userId: Meteor.userId()});
  
      if (!report) {
        return {error: 'Invalid user'};
      }
  
      if (report.week < moment().isoWeek()) {
        return {error: 'This week is not available for editing'};
      }
  
      const result = UserReports.update({_id: id}, {$set: {content, updatedOn: new Date()}});
  
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
  
      const result = UserReports.update({_id: id}, {$set: {status: status, updatedOn: new Date()}});
  
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
  
      const hasVoted = UserReports.find({_id: id, 'votes.userId': Meteor.userId()}).count();
  
      let result = null;
  
      // If user has voted already, update vote instead
      if (hasVoted) {
        result = UserReports.update({_id: id, 'votes.userId': Meteor.userId()}, {$set: {'votes.$.vote': vote}});
      } else {
        result = UserReports.update({_id: id}, {$push: {votes: {userId: Meteor.userId(), vote: vote}}});
      }
  
      const report = UserReports.findOne({_id: id});
      const summary = ReportSummaries.findOne({reportsEndDate: {$gte: report.reportedOn}, reportsStartDate: {$lte: report.reportedOn}});
      
      // closing date isn't set yet
      if(!summary.votingCloseDate) {
        const totalReportsVoted = UserReports.find({'votes.userId': Meteor.userId()}).count();
        const totalReports = summary.totalReports;
  
        // If true then start countdown for others to vote
        if (totalReports === totalReportsVoted) {
          const closingDate = moment(moment().add(5, 'days'));
          console.log('Setting the closing date to: ', closingDate.toISOString());
          ReportSummaries.update({_id: summary._id}, {$set: {votingCloseDate: closingDate.toDate()}});
  
          Jobs.run("closeVoting", summary._id, {
            in: {
              days: 5,
            },
            on: {
              hour: closingDate.hour(),
              minute: closingDate.minute()
            },
            priority: 9999999999
          });
        }
      }
  
      return {result};
    } catch (e) {
      return {error: e.message};
    }
  }
});