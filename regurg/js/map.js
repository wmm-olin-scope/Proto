
d3 = require("d3");
topojson = require("topojson");
_ = require("underscore");

exports.TweetMap = function TweetMap(selector) {
    this.selector = selector;
    this.mapDataURL = "../data/us-map.json";
    this.densityURL = "../data/density.tsv"

    this.svg = d3.select(selector);
    this.size = [this.svg.attr("width"), this.svg.attr("height")];
    this.projection = d3.geo.albersUsa()
            .scale(this.size[0]*1.2)
            .translate([this.size[0]/2, this.size[1]/2]);
    this.path = d3.geo.path().projection(this.projection);

    this.countyToDensity = d3.map();
    this.density = d3.scale.quantize()
            .domain([0, 0.15])
            .range(d3.range(9).map(function(n) { return "q" + i + "-9"; });
};

exports.TweetMap.prototype.load = function() {
    var this_ = this;
    d3.json(this.mapDataURL, function(error, mapData) {
        if (error !== null) {
            console.log(error);
            return;
        }

        this_.mapData = mapData;

        d3.tsv(this.densityURL, function(d) { 
            this_.countyToDensity.set(d.id, +d.density);
        }, function(error, _) {
            if (error !== null) {
                console.log(error);
                return;
            }

            this_.render();
        });
    });

exports.TweetMap.prototype.render = function() {
    this.counties = topojson.feature(this.mapData, 
                                     this.mapData.objects.counties);
    this.borders = topojson.mesh(this.mapData, this.mapData.objects.states, 
        function(a, b) { return a !== b; }
    );

    this.svg.append("g")
            .classed("counties", true)
            .selectAll("path")
            .data(this.counties.features)
            .enter().append("path")
            .attr("class", function(d) { return this.})
    this_.svg.append("g").attr("id", "states")
             .selectAll("path")
             .data(this_.states.features)
             .enter().append("path")
             .attr("d", this_.path);

    this_.svg.append("path").attr("id", "state-borders")
             .datum(this_.borders)
             .attr("d", this_.path);
};

exports.TweetMap.prototype.randomLocation = function() {
    var index = Math.random()*this.states.features.length;
    var centroid = d3.geo.centroid(this.states.features[index|0]);
    return _.map(centroid, function(x) { return x + Math.random()*3 - 1.5; });
};

exports.TweetMap.prototype.addTweet = function(tweet) {
    var location = this.randomLocation();
    var xy = this.projection(location);

    var circle = this.svg.append("circle").datum(tweet)
                         .classed("tweet-location", true)
                         .attr("cx", xy[0])
                         .attr("cy", xy[1])
                         .attr("r", 15);
    circle.transition().duration(500)
          .attr("r", 1);
};