require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
d3 = require('d3');
_ = require("underscore");
twt = require('./tweets');

twt.loadTweets(twt.exampleTweets, function (tweets) {
    var num = tweets.length;
    d3.select("body").append("p").text(num + " facts regurgitated!");
    console.log(tweets);
});

},{"./tweets":2,"d3":"WNTcEg","underscore":"bIUAyc"}],2:[function(require,module,exports){

_ = require('underscore');

function parseTweet(tweet) {
    return {user: {name: tweet.user.name,
                   screen_name: tweet.user.screen_name,
                   id_str: tweet.user.id_str,
                   location: tweet.user.location},
            text: tweet.text,
            geo: tweet.geo,
            created_at: new Date(tweet.created_at),
            coordinates: tweet.coordinates};
}

exports.exampleTweets = "../data/tweets-1.json";

exports.loadTweets = function(url, onData) {
  d3.json(url, function(error, tweets) {
    if (error !== null) {
      console.log("Error loading tweets: " + error);
      return;
    }

    onData(_.map(tweets, parseTweet));
  });
};

exports.countBetween = function(tweets, start, end) {
    return _.reduce(tweets, function(count, tweet) {
        var time = tweet.created_at;
        return count + ((start <= time) && (time <= end) ? 1 : 0);
    }, 0);
};
},{"underscore":"bIUAyc"}],"d3":[function(require,module,exports){
module.exports=require('WNTcEg');
},{}],"underscore":[function(require,module,exports){
module.exports=require('bIUAyc');
},{}],5:[function(require,module,exports){

},{}]},{},[1])
;