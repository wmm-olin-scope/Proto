d3 = require('d3');
_ = require("underscore");

twt = require('./tweets');
Counter = require('./counter').Counter;
TweetMap = require('./map').TweetMap;
TweetScroller = require('./scroller').TweetScroller;

/*
twt.loadTweets(twt.exampleTweets, function (tweets) {
    var num = tweets.length;
    d3.select("body").append("p").text(num + " facts regurgitated!");
    console.log(tweets);
});*/

document.onready = function() {
    var factsToday = new Counter("#regurgitated-today", 985);
    setInterval(function() { factsToday.update(factsToday.value + (Math.random()*4)|0); }, 1000);

    var tweetMap = new TweetMap("#tweet-map");
    tweetMap.load();
    setInterval(function() { tweetMap.addTweet({}); }, 700);

    var tweetScroller = new TweetScroller("#tweet-scroller", 10);
    var i = 0;
    setInterval(function() {
        tweetScroller.addTweet({id_str: i.toString(),
                                content: "This is tweet #" + i});
        i += 1;
    }, 200);
};

