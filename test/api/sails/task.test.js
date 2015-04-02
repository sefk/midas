var assert = require('chai').assert;
var conf = require('./helpers/config');
var utils = require('./helpers/utils');
var request;

describe('tasks:', function () {

  describe('not logged in:', function () {
    before(function (done) {
      request = utils.init();
      utils.logout(request, function (err) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('deny export', function (done) {
      request.get({
        url: conf.url + '/task/export'
      }, function (err, response) {
        assert.equal(response.statusCode, 403);
        done(err);
      });
    });
  });

  describe('not admin:', function () {
    before(function (done) {
      request = utils.init();
      utils.login(request, conf.defaultUser, function (err) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('deny export', function (done) {
      request.get({
        url: conf.url + '/task/export'
      }, function (err, response, body) {
        assert.equal(response.statusCode, 403);
        done(err);
      });
    });
  });

  describe('admin:', function () {
    before(function (done) {
      request = utils.init();
      utils.login(request, conf.adminUser, function (err) {
        if (err) {
          return done(err);
        }
        utils.createTasks(request, function (err) {
          if (err) {
            return done(err);
          }
          done(err);
        });
      });
    });

    it('export', function (done) {
      request.get({
        url: conf.url + '/task/export'
      }, function (err, response, body) {
        assert.equal(response.statusCode, 200);
        var saniBody = body.replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g, "DATE");
        var testBody = '"project_id","name","description","created_date","published_date","assigned_date","creator_name","signups"\n,' +
        '"task1","description1","DATE","DATE","DATE",null,0\n,' +
        '"task2","description2","DATE","DATE","DATE",null,0\n';
        assert.equal(saniBody, testBody);
        done(err);
      });
    });
  });

});
