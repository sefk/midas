var _ = require('underscore');
var Backbone = require('backbone');
var d3 = require('d3');
var topojson = require('topojson');

// code for world map adapted from https://gist.github.com/mbostock/4180634
// and http://techslides.com/demos/d3/worldmap-template.html

var MapView = Backbone.View.extend({

  el: "#container",

  events: {},

  initialize: function (options) {
    var that = this;
    this.options = options;
    $(window).resize(_.debounce(function () {
      that.render();
    }, 200));

    // shades of green, from http://colorbrewer2.org/
    // TODO: make map colors configurable
    this.color = d3.scale.ordinal()
      .domain(d3.range(0, 7))
      .range([
        'rgb(204,236,230)',
        'rgb(153,216,201)',
        'rgb(102,194,164)',
        'rgb(65,174,118)',
        'rgb(35,139,69)',
        'rgb(0,88,36)'
      ]);

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

  },

  render: function () {
    var that = this;
    that.width = parseInt(d3.select(that.el).style('width'), 10);
    that.height = Math.round(that.width / 2);

    this.$el.addClass("mapborder");

    that.$el.find('svg').remove();
    var svg = d3.select(that.el).append('svg')
      .attr("preserveAspectRatio", "xMaxYMid")
      .attr("meetOrSlice", "slice")
      .attr("viewBox", "0 0 " + that.width + " " + that.height)
      .attr("width", that.width)
      .attr("height", that.height);

    that.projection = d3.geo.mercator()
      .scale(that.width / 2 / Math.PI)
      .translate([that.width / 2, that.height / 2]);

    var path = d3.geo.path()
      .projection(that.projection);

    svg.append("defs").append("path")
      .datum({type: "Sphere"})
      .attr("id", "sphere")
      .attr("d", path);

    svg.selectAll(".country")
      .each(function (n) {
        delete that.countries[n].color;
      });
    svg.selectAll(".country")
      .data(that.countries)
      .enter().insert("path", ".boundary")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", function (d) {
        return that.color(d.color);
      });

    d3.select(self.frameElement).style("height", that.height + "px");
  },

  addpoint: function (lat, lon) {

    var gpoint = g.append("g").attr("class", "gpoint");
    var x = this.projection([lat, lon])[0];
    var y = this.projection([lat, lon])[1];

    gpoint.append("svg:circle")
      .attr("cx", x)
      .attr("cy", y)
      .attr("class", "point")
      .attr("r", 1.5);
  },

  cleanup: function () {
    removeView(this);
  }

});

module.exports = MapView;
