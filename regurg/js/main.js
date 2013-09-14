d3 = require('d3');
_ = require("underscore");
twt = require('./tweets');
Counter = require('./counter').Counter;

/*
twt.loadTweets(twt.exampleTweets, function (tweets) {
    var num = tweets.length;
    d3.select("body").append("p").text(num + " facts regurgitated!");
    console.log(tweets);
});*/

document.onready = function() {
    factsToday = new Counter("#regurgitated-today", 985);

    setInterval(function() { factsToday.update(factsToday.value + (Math.random()*4)|0); }, 1000);
};

