
d3 = require("d3");

exports.TweetScroller = function TweetScroller(selector, numToShow) {
    this.selector = selector;
    this.numToShow = numToShow;

    this.div = d3.select(selector);
    this.tweets = [];
};

exports.TweetScroller.prototype.addTweets = function(tweets) {
    this.
};