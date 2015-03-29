/**
 * ExportController
 *
 * @module    :: Controller
 * @description  :: CSV Export endpoints
 */

var util = require('../services/utils/export');

module.exports = {

  tasks: function (req, resp) {
    Task.find().exec(function (err, tasks) {
      var render;
      if (err) {
        render = {
          rc: 400,
          content: {message: 'An error occurred looking up tasks.', error: err}
        };
      } else {
        render = util.renderCSV(Task, tasks);
        if (render.rc >= 200 && render.rc < 300) {
          resp.set('Content-Type', 'text/csv');
          resp.set('Content-disposition', 'attachment; filename=users.csv');
        }
      }
      resp.send(render.rc, render.content);
    });
  },

  users: function (req, resp) {
    User.find().exec(function (err, users) {
      var render;
      if (err) {
        render = {
          rc: 400,
          content: {message: 'An error occurred looking up users.', error: err}
        };
      } else {
        render = util.renderCSV(Task, users);
        if (render.rc >= 200 && render.rc < 300) {
          resp.set('Content-Type', 'text/csv');
          resp.set('Content-disposition', 'attachment; filename=users.csv');
        }
      }
      resp.send(render.rc, render.content);
    });
  }

};
