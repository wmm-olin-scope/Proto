d3 = require('d3');
_ = require("underscore");

twt = require('./tweets');
Counter = require('./counter').Counter;
TweetMap = require('./map').TweetMap;
TweetScroller = require('./scroller').TweetScroller;
FactDisplay = require('./facts').FactDisplay;

/*
twt.loadTweets(twt.exampleTweets, function (tweets) {
    var num = tweets.length;
    d3.select("body").append("p").text(num + " facts regurgitated!");
    console.log(tweets);
});*/

document.onready = function() {
    var tweetMap = new TweetMap("#tweet-map"); tweetMap.load();
    var factsToday = new Counter("#regurgitated-today", 985);
    var tweetScroller = new TweetScroller("#tweet-scroller", 6);
    var factDisplay = new FactDisplay("#magnitude"); factDisplay.update();

    setInterval(function() {
        var newTweets = 1 + (Math.random()*Math.random()*2)|0;
        factsToday.update(factsToday.value + newTweets);
        for (var i = 0; i < newTweets; i++) tweetMap.addTweet();

        if (Math.random() < 0.05) factDisplay.update();
    }, 1000);

    var tweetLoader = new twt.FakeTweetLoader(function(tweets) {
        _.each(tweets, function(t) { tweetScroller.addTweet(t); });
    }, 2000);
    tweetLoader.start();
};

