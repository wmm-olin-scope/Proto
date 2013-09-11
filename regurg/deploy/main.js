require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"d3":[function(require,module,exports){
module.exports=require('WNTcEg');
},{}],2:[function(require,module,exports){
d3 = require('d3');

function loadTweets(onData) {
  d3.json("../data/example-tweets.json", function(error, data) {
    if (error !== null) {
      console.log("Error loading tweets: " + error);
      return;
    }
    onData(data.tweets);
  });
}

loadTweets(function(tweets) {
  console.log(tweets);
});

},{"d3":"WNTcEg"}],3:[function(require,module,exports){

},{}]},{},[2])
;