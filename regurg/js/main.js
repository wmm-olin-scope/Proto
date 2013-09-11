d3 = require('d3');
_ = require("underscore");
twt = require('./tweets');

twt.loadTweets(twt.exampleTweets, function (tweets) {
    var num = tweets.length;
    d3.select("body").append("p").text(num + " facts regurgitated!");
    console.log(tweets);
});
