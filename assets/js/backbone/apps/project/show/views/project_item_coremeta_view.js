var _ = require('underscore');
var async = require('async');
var Backbone = require('backbone');
var utils = require('../../../../mixins/utilities');
var marked = require('marked');
var MarkdownEditor = require('../../../../components/markdown_editor');
var Popovers = require('../../../../mixins/popovers');
var ModalComponent = require('../../../../components/modal');
var ProjectItemCoreMetaTemplate = require('../templates/project_item_coremeta_template.html');


//if(_.isUndefined(popovers)){var popovers = new Popovers();}

var ProjectItemCoreMetaView = Backbone.View.extend({

  el: "#project-coremeta-wrapper",
  model : null,

  // Set the model to null, before it is fetched from the server.
  // This allows us to clear out the previous data from the list_view,
  // and get ready for the new data for the project show view.
  // model: null,

  events: {
    "blur #project-edit-form-title"            : "v",
    "blur #project-edit-form-description"      : "v",
    "click #coremeta-save"                     : "saveCoreMeta",
    "click #coremeta-view"                     : "viewProject"
  },

  // The initialize method is mainly used for event bindings (for effeciency)
  initialize: function (options) {
    var self = this;
    this.options = options;
    this.data = options.data;
    this.action = options.action;
    this.user = window.cache.currentUser || {};
    this.edit = false;
    if (this.options.action) {
      if (this.options.action == 'edit') {
        this.edit = true;
      }
    }

    this.model.on("project:coremeta:show:rendered", function () {
      self.initializeTextArea();
      self.initializeToggledElements();
    });

    this.model.on("project:save:success", function (data) {
      self.render();
      $('#project-coremeta-success').show();
      self.viewProject({});
    });

    this.model.on("project:tags:save:success", function (data) {
      self.render();
      $('#project-coremeta-success').show();
      self.viewProject({});
    });

  },

  render: function () {
    var data = {
      data: this.model.toJSON()
    };
    // convert description to html using markdown syntax
    data.data.descriptionHtml = marked(data.data.description || '');
    var compiledTemplate = _.template(ProjectItemCoreMetaTemplate)(data);
    this.$el.html(compiledTemplate);
    this.$el.i18n();
    this.model.trigger("project:coremeta:show:rendered", data);

    return this;
  },

  initializeTextArea: function () {
    if (this.md) { this.md.cleanup(); }
    this.md = new MarkdownEditor({
      data: this.model.toJSON().description,
      el: ".markdown-edit",
      id: 'project-edit-form-description',
      title: 'Project Description',
      rows: 6,
      validate: ['empty']
    }).render();
  },

  initializeToggledElements: function() {
    var self = this;
    if ((this.model.attributes.isOwner || this.user.isAdmin) && this.edit){
      self.$('#project-coremeta-form').show();
      self.$('#project-coremeta-show').hide();
    }
    else{
      self.$('.coremeta-admin').hide();
    }
  },

  v: function(e) {
    return validate(e);
  },

  saveCoreMeta: function (e){
    if (e.preventDefault) e.preventDefault();
    if (!(this.model.attributes.isOwner || this.user.isAdmin) && this.edit) return false;

    // validate the form fields
    var validateIds = ['#project-edit-form-title', '#project-edit-form-description'];
    var abort = false;
    for (var i in validateIds) {
      var iAbort = validate({ currentTarget: validateIds[i] });
      abort = abort || iAbort;
    }
    if (abort) {
      return;
    }

    // process and update the data model for the project
    var self = this;
    var pId = self.model.attributes.id;
    var title = self.$('#project-edit-form-title').val();
    var description = self.$('#project-edit-form-description').val();
    function getTags() {
      var modelTags = self.model.get('tags'),
          tags = [];
      tags.push.apply(tags, this.$("#tag_topic").select2('data'));
      tags.push.apply(tags, this.$("#tag_skill").select2('data'));
      tags.push.apply(tags, this.$("#tag_location").select2('data'));
      tags.push.apply(tags, this.$("#tag_agency").select2('data'));
      return _(modelTags.concat(tags)).chain().filter(function(tag) {
          return _(tag).isObject() && !tag.context;
        }).map(function(tag) {
          return (tag.id && tag.id !== tag.name) ? +tag.id : {
            name: tag.name,
            type: tag.tagType
          };
        }).unique().value();
    }
    var params = { title :title, description: description, tags: getTags() };

    self.model.trigger("project:tag:update:start");
    self.model.trigger("project:model:update", params);
  },

  viewProject: function (e) {
    if (e.preventDefault) e.preventDefault();
    Backbone.history.navigate('projects/' + this.model.attributes.id, { trigger: true });
  },

  // ---------------------
  //= Utility Methods
  // ---------------------
  cleanup: function() {
    if (this.md) { this.md.cleanup(); }
    removeView(this);
  }

});

module.exports = ProjectItemCoreMetaView;
