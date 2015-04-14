var _ = require('underscore');
var Backbone = require('backbone');
var BaseController = require('../../../base/base_controller');
var MapView = require('../views/map_view');


Map = {};

Map.Controller = BaseController.extend({

  events: {
  },

  initialize: function (options) {
    this.homeView = new MapView().render();
  },

  cleanup: function() {
    if (this.mapView) this.mapView.cleanup();
    removeView(this);
  }

});

module.exports = Map.Controller;
