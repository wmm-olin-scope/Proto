
d3 = require("d3");
topojson = require("topojson");
_ = require("underscore");

exports.TweetMap = function TweetMap(selector) {
    this.selector = selector;
    this.mapDataURL = "../data/us-map.json";

    this.svg = d3.select(selector);
    this.size = [this.svg.attr("width"), this.svg.attr("height")];
    this.projection = d3.geo.albersUsa()
                            .scale(this.size[0]*1.2)
                            .translate([this.size[0]/2, this.size[1]/2]);
    this.path = d3.geo.path().projection(this.projection);
};

exports.TweetMap.prototype.load = function() {
    var this_ = this;
    d3.json(this.mapDataURL, function(error, mapData) {
        if (error !== null) {
            console.log(error);
            return;
        }

        this_.mapData = mapData;
        this_.states = topojson.feature(mapData, mapData.objects.states);
        this_.borders = topojson.mesh(mapData, mapData.objects.states, 
            function(a, b) { return a !== b; }
        );

        this_.svg.append("g").attr("id", "states")
                 .selectAll("path")
                 .data(this_.states.features)
                 .enter().append("path")
                 .attr("d", this_.path);

        this_.svg.append("path").attr("id", "state-borders")
                 .datum(this_.borders)
                 .attr("d", this_.path);
    });
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