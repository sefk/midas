var _ = require('underscore');
var Backbone = require('backbone');
var BaseController = require('../../../base/base_controller');
var MapView = require('../views/map_view');
var ProfilesCollection = require('../../../entities/profiles/profiles_collection');


Map = {};

Map.Controller = BaseController.extend({

  events: {},

  initialize: function () {
    this.profiles = new ProfilesCollection();

    // the View renders itself so it can handle the callback correctly
    // from reading and parsing all that map data
    this.mapView = new MapView({
      el: this.el,
      people: this.profiles
    });
  },

  cleanup: function() {
    if (this.mapView) {
      this.mapView.cleanup();
    }
    removeView(this);
  }

});

module.exports = Map.Controller;
