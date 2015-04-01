/**
 * TaskController
 *
 * @module    :: Controller
 * @description :: Interaction with tasks
 */
var taskUtil = require('../services/utils/task');
var tagUtil = require('../services/utils/tag');
var userUtil = require('../services/utils/user');
var exportUtil = require('../services/utils/export');
var i18n = require('i18next');

module.exports = {

  find: function (req, res) {
    var user = (req.user) ? req.user[0] : null,
        where = {};

    if (req.task) {
      taskUtil.getMetadata(req.task, user, function (err) {
        if (err) { return res.send(400, { message: i18n.t('taskAPI.errMsg.likes', 'Error looking up task likes.') }); }
        taskUtil.getVolunteers(req.task, function (err) {
          if (err) { return res.send(400, { message: i18n.t('taskAPI.errMsg.volunteers','Error looking up task volunteers.') }); }
          return res.send(req.task);
        });
      });
      return;
    }
    // Only show drafts for current user
    if (user) {
      where = { or: [{
        state: {'!': 'draft'}
      }, {
        state: 'draft',
        userId: user.id
      }]};
    } else {
      where.state = {'!': 'draft'};
    }

    // run the common task find query
    taskUtil.findTasks(where, function (err, tasks) {
      if (err) { return res.send(400, err); }
      return res.send({ tasks: tasks });
    });
  },

  findOne: function(req, res) {
    module.exports.find(req, res);
  },

  findAllByProjectId: function (req, res) {
    Task.findByProjectId(req.params.id)
    .sort({'updatedAt': -1})
    .exec(function(err, tasks) {
      if (err) return res.send(err, 500);
      res.send({ tasks: tasks });
    });
  },

  export: function (req, resp) {
    Task.find().exec(function (err, tasks) {
      if (err) {
        resp.send(400, {message: 'Error when querying for tasks.', error: err});
        return;
      }

      User.find({id: _.pluck(tasks, 'userId')}).exec(function (err, creators) {
        if (err) {
          resp.send(400, {message: 'Error when querying for task creators.', error: err});
          return;
        }
        for (var i=0; i < tasks.length; i++) {
          var creator = _.findWhere(creators, {id: tasks[i].userId});
          tasks[i].creator_name = creator ? creator.name : "";
        }

        // waterline ORM groupby/count isn't ready for prime time yet, query manually
        var sql = 'SELECT "taskId" AS id, sum(1) AS count FROM volunteer GROUP BY "taskId"';
        Volunteer.query(sql, function (err, volQueryResult) {
          if (err) {
            resp.send(400, {message: 'Error when querying volunteers.', error: err});
            return;
          }
          var volunteers = volQueryResult.rows;
          for (var i=0; i < tasks.length; i++) {
            var taskVols = _.findWhere(volunteers, {id: tasks[i].id});
            tasks[i].signups = taskVols ? parseInt(taskVols.count) : 0;
          }

          // gathered all data, render and return
          var render = exportUtil.renderCSV(Task, tasks);
          if (render && render.rc >= 200 && render.rc < 300) {
            resp.set('Content-Type', 'text/csv');
            resp.set('Content-disposition', 'attachment; filename=tasks.csv');
          }
          resp.send(render.rc, render.content);
        });
      });
    });
  }

};
