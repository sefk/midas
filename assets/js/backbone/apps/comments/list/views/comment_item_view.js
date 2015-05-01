
var _ = require('underscore');
var Backbone = require('backbone');
var utilities = require('../../../../mixins/utilities');
var Autolinker = require('autolinker');
var marked = require('marked');
var CommentItemTemplate = require('../templates/comment_item_template.html');


var CommentItemView = Backbone.View.extend({

  render: function () {
    this.model.currentUser = window.cache.currentUser;
    this.model.valueHtml = marked(Autolinker.link(this.model.value), { sanitize: false });
    this.model.commentId = this.model.id;

    var compiledTemplate = _.template(CommentItemTemplate)(this.model);
    this.$el.append(compiledTemplate);
  },

  cleanup: function () {
    removeView(this);
  }

});

module.exports = CommentItemView;
