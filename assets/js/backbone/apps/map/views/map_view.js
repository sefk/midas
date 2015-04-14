var _ = require('underscore');
var Backbone = require('backbone');
var d3 = require('d3');
var topojson = require('topojson');

// code for world map adapted from https://gist.github.com/mbostock/4180634

var MapView = Backbone.View.extend({

  el: "#container",

  events: {},

  initialize: function (options) {
    var that = this;
    that.options = options;
    d3.json("data/world-50m.json", function (error, world) {
      that.countries = topojson.feature(world, world.objects.countries).features;
      that.neighbors = topojson.neighbors(world.objects.countries.geometries);
      that.countries.forEach(function (c, i) {
        c.color = d3.max(that.neighbors[i], function (n) {
          return that.countries[n].color;
        }) + 1 | 0
      });
      that.render();
    });

    $(window).resize(_.debounce(function () {
      that.render();
    }, 600));
  },

  render: function () {
    var that = this;
    var width = parseInt(d3.select(this.el).style('width'), 10);
    var height = Math.round(width / 2);

    this.$el.find('svg').remove();
    var svg = d3.select(this.el).append('svg')
      .attr("preserveAspectRatio", "xMaxYMid")
      .attr("meetOrSlice", "slice")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("width", width)
      .attr("height", height);

    var projection = d3.geo.mercator()
      .scale(200)
      .translate([width / 2, height / 3]);

    var path = d3.geo.path()
      .projection(projection);

    var color = d3.scale.ordinal()
      .domain(d3.range(0, 7))
      .range([
        'rgb(237,248,251)',
        'rgb(204,236,230)',
        'rgb(153,216,201)',
        'rgb(102,194,164)',
        'rgb(65,174,118)',
        'rgb(35,139,69)',
        'rgb(0,88,36)'
      ]);

    svg.append("defs").append("path")
      .datum({type: "Sphere"})
      .attr("id", "sphere")
      .attr("d", path);

    svg.append("use")
      .attr("class", "stroke")
      .attr("xlink:href", "#sphere");

    svg.selectAll(".country")
      .each(function(n) {
        delete that.countries[n].color;
      });

    svg.selectAll(".country")
      .data(that.countries)
      .enter().insert("path", ".graticule")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", function (d) {
        return color(d.color)
      });

    d3.select(self.frameElement).style("height", height + "px");
  },

  cleanup: function () {
    removeView(this);
  }

});

module.exports = MapView;
