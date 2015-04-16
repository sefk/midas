var _ = require('underscore');
var Backbone = require('backbone');
var d3 = require('d3');
var topojson = require('topojson');

// code for world map adapted from https://gist.github.com/mbostock/4180634
// and http://techslides.com/demos/d3/worldmap-template.html

var MapView = Backbone.View.extend({

  events: {},

  initialize: function (options) {
    var that = this;
    this.el = options.el;
    this.people = options.people;

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

    that.$el.find('svg').remove();
    that.svg = d3.select(that.el).append('svg')
      .attr("preserveAspectRatio", "xMaxYMid")
      .attr("meetOrSlice", "slice")
      .attr("viewBox", "0 0 " + that.width + " " + that.height)
      .attr("width", that.width)
      .attr("height", that.height)
      .attr("style", "border:solid 2px #222; border-radius: 5px");

    that.projection = d3.geo.mercator()
      .scale(that.width / 2 / Math.PI)
      .translate([that.width / 2, that.height / 2]);

    var path = d3.geo.path()
      .projection(that.projection);

    that.svg.selectAll(".country")
      .data(that.countries)
      .enter().insert("path", ".boundary")
      .attr("class", "country")
      .attr("d", path)
      .style("fill", function (d) {
        return that.color(d.color);
      });

    that.cities = that.svg.append("g");
    this.people.on("sync", this.points, this);
    this.people.fetch();
  },

  points: function (people) {
    var that = this;
    var locationTags = people
      .pluck('location')
      .filter(function (p) {return !_.isUndefined(p)});

    locationTags.forEach(function (locationTag) {
      var loc = locationTag.tag.data;
      var gpoint = that.cities.append("g").attr("class", "gpoint");
      var x = that.projection([loc.lon, loc.lat])[0];
      var y = that.projection([loc.lon, loc.lat])[1];

      gpoint.append("svg:circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("class", "point")
        .attr("r", 6)
    });
  },

  cleanup: function () {
    delete this.$el.find('svg');
    removeView(this);
  }

});

module.exports = MapView;
