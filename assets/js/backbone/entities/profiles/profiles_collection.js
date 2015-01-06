define([
  'underscore',
  'backbone',
  'project_model'
], function (_, Backbone, ProfileModel) {

  var ProfilesCollection = Backbone.Collection.extend({

    model: ProfileModel,

    url: '/api/user/find',

    parse: function (response) {
      return response;
    },

    initialize: function () {
      var self = this;
    },

  });

  return ProfilesCollection;
});