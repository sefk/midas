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
      // TODO: use association to do proper join
      User.find({id: _.pluck(tasks, 'userId')}).exec(function (err, creators) {
        if (err) {
          resp.send(400, {message: 'Error when querying for task creators.', error: err});
          return;
        }
        tasks.forEach(function (task, i) {
          tasks[i].creator_name = _.findWhere(creators, {id: task.userId}).name;
        });
        var render = exportUtil.renderCSV(Task, tasks);
        if (render.rc >= 200 && render.rc < 300) {
          resp.set('Content-Type', 'text/csv');
          resp.set('Content-disposition', 'attachment; filename=users.csv');
        }
        resp.send(render.rc, render.content);
      });
    });
  }

};
