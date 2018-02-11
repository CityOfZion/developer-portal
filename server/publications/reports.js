Meteor.publish('reports', function () {
  if (Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
    ReactiveAggregate(this, UserReports, [
      {
        $project: {
          votes: "$votes",
          userId: "$userId",
          status: "$status",
          week: {"$week": "$reportedOn"},
          year: {"$year": "$reportedOn"},
          yearWeek: {
            $dateToString: {
              format: "%Y-%U",
              date: "$reportedOn"
            }
          }
        }
      },
      {
        $group: {
          _id: "$yearWeek",
          reports: {$push: "$$ROOT"}
        }
      },
      {
        $sort: {
          _id: -1
        }
      }
    ]);
  } else {
    return UserReports.find({userId: Meteor.userId()}, {votes: 0});
  }
});

Meteor.publish('reportById', function (id) {
  if (Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
    return UserReports.find({_id: id});
  }
  
  return UserReports.find({_id: id, userId: Meteor.userId()}, {votes: 0});
});

Meteor.publish('reportsByYearWeek', function (yearWeek) {
  if (Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) {
    return UserReports.find({week: week});
  }
  return UserReports.find({week: week, userId: Meteor.userId()}, {votes: 0});
});

Meteor.publish('adminReportsOverviewBySummaryId', function(reportSummaryId) {
  if (!Roles.userIsInRole(Meteor.userId(), ['council', 'admin'])) return null;
  
  const reportSummary = ReportSummaries.findOne({_id: reportSummaryId});
  
  ReactiveAggregate(this, UserReports, [
    {
      $match: {
        reportedOn: {
          $gte: reportSummary.reportsStartDate,
          $lte: reportSummary.reportsEndDate
        }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $project: {
        votes: "$votes",
        projectId: "$_id",
        userId: "$userId",
        status: "$status",
        content: "$content",
        reportedOn: "$reportedOn",
        user: {
          username: "$user.username",
          mainWalletAddress: "$user.profile.mainWalletAddress"
        },
        week: {"$week": "$reportedOn"},
        year: {"$year": "$reportedOn"},
        yearWeek: {
          $dateToString: {
            format: "%Y-%U",
            date: "$reportedOn"
          }
        }
      }
    },
    {
      $group: {
        _id: "$yearWeek",
        reports: {$push: "$$ROOT"}
      }
    },
    {
      $sort: {
        _id: -1
      }
    }
  ], { clientCollection: "adminReports" });
});