
d3 = require("d3");
topojson = require("topojson");
_ = require("underscore");

exports.TweetMap = function TweetMap(selector) {
    this.selector = selector;
    this.mapDataURL = "../data/us-map.json";
    this.densityURL = "../data/density.tsv";

    this.svg = d3.select(selector);
    this.size = [this.svg.attr("width"), this.svg.attr("height")];
    this.projection = d3.geo.albersUsa()
            .scale(this.size[0]*1.2)
            .translate([this.size[0]/2, this.size[1]/2]);
    this.path = d3.geo.path().projection(this.projection);

    this.countyToDensity = d3.map();
    this.density = d3.scale.quantize()
            .domain([0, 0.15])
            .range(d3.range(9).map(function(n) { return "q" + n + "-9"; }));
};

exports.TweetMap.prototype.load = function() {
    var this_ = this;
    d3.json(this.mapDataURL, function(error, mapData) {
        if (error !== null) {
            console.log(error);
            return;
        }

        this_.mapData = mapData;
        d3.tsv(this_.densityURL, function(error, densities) {
            if (error !== null) {
                console.log(error);
                return;
            }

            console.log(densities);
            _.map(densities, function(d) {
                this_.countyToDensity.set(d.id, +d.density);
            });

            this_.render();
        });
    });
};

exports.TweetMap.prototype.render = function() {
    this.counties = topojson.feature(this.mapData, 
                                     this.mapData.objects.counties);
    this.borders = topojson.mesh(this.mapData, this.mapData.objects.states, 
        function(a, b) { return a !== b; }
    );

    var this_ = this;
    this.svg.append("g")
            .classed("county", true)
            .selectAll("path")
            .data(this.counties.features)
            .enter().append("path")
            .attr("class", function(d) { 
                return this_.density(this_.countyToDensity.get(d.id));
            })
            .attr("id", function(d) { return "county" + d.id; })
            .attr("d", this.path);

    this.svg.append("path")
            .datum(this.borders)
            .classed("states", true)
            .attr("d", this.path);

    this.svg.append("g")
            .attr("id", "lit-up-group");
};

exports.TweetMap.prototype.randomCounty = function() {
    var keys = this.countyToDensity.keys();
    return keys[(Math.random()*keys.length)|0];
};

exports.TweetMap.prototype.addTweet = function(tweet) {
    var countyID = this.randomCounty();
    var this_ = this;

    function makeTransform(feature, scale) {
        var center = d3.geo.centroid(feature);
        var xy = this_.projection(center);
        var k = -(scale - 1);
        return "translate(" + xy[0]*k + "," + xy[1]*k + ")" +
               "scale(" + scale + ")";
    }

    this.svg.select("#county" + countyID).each(function(d) {
        this_.svg.select("#lit-up-group")
                .append("path")
                .datum(d)
                .classed("lit-up-county", true)
                .attr("d", this_.path)

                .attr("fill-opacity", 0.1)
                .attr("transform", function(d) { return makeTransform(d, 1); })
                .transition().duration(300)
                .attr("fill-opacity", 1)
                .attr("transform", function(d) { return makeTransform(d, 4); })
                .transition().duration(700)
                .transition().duration(300)
                .attr("fill-opacity", 0.1)
                .attr("transform", function(d) { return makeTransform(d, 1); })
                .remove();
    });
};