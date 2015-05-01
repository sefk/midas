var Bootstrap = require('bootstrap');
var _ = require('underscore');
var Backbone = require('backbone');
var utils = require('../../../../mixins/utilities');
var UIConfig = require('../../../../config/ui.json');
var async = require('async');
var marked = require('marked');
var TimeAgo = require('../../../../../vendor/jquery.timeago');
var BaseView = require('../../../../base/base_view');
var TaskShowTemplate = require('../templates/task_show_item_template.html');


var TaskItemView = BaseView.extend({

  initialize: function (options) {
    var self = this;
    this.options = options;
    this.model.trigger("task:model:fetch", options.id);
    this.listenTo(this.model, "task:model:fetch:success", function (model) {
      self.model = model;
      self.initializeTags(self);
    });
  },

  render: function (self) {
    self.data = {
      user: window.cache.currentUser,
      model: self.model.toJSON(),
      tags: self.model.toJSON().tags
    };

    self.data['madlibTags'] = organizeTags(self.data.tags);
    // convert description from markdown to html
    self.data.model.descriptionHtml = marked(self.data.model.description);
    self.model.trigger('task:tag:data', self.tags, self.data['madlibTags']);

    var d = self.data,
        vol = ((!d.user || d.user.id !== d.model.userId) && d.model.state !== 'draft');
    self.data.ui = UIConfig;
    self.data.vol = vol;
    var compiledTemplate = _.template(TaskShowTemplate)(self.data);
    self.$el.html(compiledTemplate);
    self.$el.i18n();
    $("time.timeago").timeago();
    self.updateTaskEmail();
    self.model.trigger('task:show:render:done');
	if (window.cache.taskVolunteer && !self.model.attributes.volunteer) {
      $('#volunteer').click();
      delete window.cache.taskVolunteer;
    }
  },

  updateTaskEmail: function() {
    var self = this;
    $.ajax({
      url: encodeURI('/api/email/makeURL?email=contactUserAboutTask&subject=Check Out "'+ self.model.attributes.title + '"' +
      '&opportunityTitle=' + self.model.attributes.title +
      '&opportunityLink=' + window.location.protocol + "//" + window.location.host + "" + window.location.pathname +
      '&opportunityDescription=' + (self.model.attributes.description || '') +
      '&opportunityMadlibs=' + $('<div />', { html: self.$('#task-show-madlib-description').html() }).text().replace(/\s+/g, " ")),
      type: 'GET'
    }).done( function (data) {
      self.$('#email').attr('href', data);
    });

  },

  initializeTags: function (self) {
    var types = ["task-skills-required", "task-time-required", "task-people", "task-length", "task-time-estimate"];

    self.tagSources = {};

    var requestAllTagsByType = function (type, cb) {
      $.ajax({
        url: '/api/ac/tag?type=' + type + '&list',
        type: 'GET',
        async: false,
        success: function (data) {
          // Dynamically create an associative
          // array based on that for the pointer to the list itself to be iterated through
          // on the front-end.
          self.tagSources[type] = data;
          return cb();
        }
      });
    }

    async.each(types, requestAllTagsByType, function (err) {
      self.model.trigger('task:tag:types', self.tagSources);
      self.render(self);
    });
  },

  cleanup: function() {
    removeView(this);
  }
});

module.exports = TaskItemView;
