var _ = require('underscore');
var Backbone = require('backbone');
var d3 = require('d3');
var topojson = require('topojson');

// code for world map adapted from https://gist.github.com/mbostock/4180634

var MapView = Backbone.View.extend({

  el: "#container",

  events: {
  },

  initialize: function (options) {
    this.options = options;
  },

  render: function () {
    var m_width = parseInt(d3.select(this.el).style('width'),10)
    var m_height = 500;
    var width = m_width;
    var height = m_height;

    var svg = d3.select(this.el).append("svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("width", m_width)
      .attr("height", m_width * height / width);

    var projection = d3.geo.mercator()
      .scale(150)
      .translate([width / 2, height / 2]);

    var path = d3.geo.path()
      .projection(projection);

    var color = d3.scale.category20c();

    svg.append("defs").append("path")
      .datum({type: "Sphere"})
      .attr("id", "sphere")
      .attr("d", path);

    svg.append("use")
      .attr("class", "stroke")
      .attr("xlink:href", "#sphere");

    d3.json("data/world-50m.json", function (error, world) {
      var countries = topojson.feature(world, world.objects.countries).features;
      var neighbors = topojson.neighbors(world.objects.countries.geometries);

      svg.selectAll(".country")
        .data(countries)
        .enter().insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
        .style("fill", function (d, i) {
          return color(d.color = d3.max(neighbors[i], function (n) {
            return countries[n].color;
          }) + 1 | 0);
        });

      svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function (a, b) {
          return a !== b;
        }))
        .attr("class", "boundary")
        .attr("d", path);
    });

    d3.select(self.frameElement).style("height", height + "px");
  },

  cleanup: function () {
    removeView(this);
  }

});

module.exports = MapView;
