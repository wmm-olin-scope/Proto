
d3 = require("d3");
_ = require("underscore");

var tweetHeight = 35;
var duration = 500;

exports.TweetScroller = function TweetScroller(selector, numToShow) {
    this.selector = selector;
    this.numToShow = numToShow;

    this.div = d3.select(selector);
    this.tweets = [];
    this.y = d3.scale.linear().domain([0, this.numToShow-1])
                              .rangeRound([0, (this.numToShow-1)*tweetHeight]);

    var this_ = this;
    this.update = _.throttle(function() { this_.doUpdate(); }, duration*2);
    this.toAdd = null;
};

exports.TweetScroller.prototype.addTweet = function(tweet) {
    this.toAdd = tweet;
    this.update();
};

exports.TweetScroller.prototype.doUpdate = function() {
    if (this.toAdd === null) return;

    this.tweets.push(this.toAdd);
    this.toAdd = null;

    if (this.tweets.length > this.numToShow) {
        this.tweets = this.tweets.slice(this.tweets.length - this.numToShow);
    }
    this.redraw();
};

function highlightHashtags(text) {
    var hashtagRegex = /#([a-zA-Z0-9]+)/g;

    var match = hashtagRegex.exec(text);
    while (match !== null) {
        var hash = '<span class="hash">#</span>';
        var tag = '<span class="hashtag">' + match[1] + '</span>';
        text = text.replace(match[0], hash + tag);
        match = hashtagRegex.exec(text);
    }
    return text;
}

exports.TweetScroller.prototype.redraw = function() {
    var divs = this.div.selectAll("div.tweet").data(this.tweets, 
        function(tweet) { return tweet.id_str; }
    );

    var this_ = this;
    divs.enter()
            .append("div")
            .classed("tweet", true)
            .html(function(t) { return highlightHashtags(t.text); })
            .style("top", function(_, i) {
                return this_.y(Math.max(i + 1, this_.numToShow));
            })
        .transition()
            .duration(duration)
            .style("top", function(_, i) {
                return this_.y(i);
            });

    divs.transition()
            .duration(duration)
            .style("top", function(_, i) {
                return this_.y(i);
            });

    divs.exit()
        .transition()
            .duration(duration)
            .style("top", function(_, i) {
                return this_.y(i - 1);
            })
            .remove();
};