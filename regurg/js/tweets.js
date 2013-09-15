
_ = require('underscore');

exports.tweetServerURL = "http://localhost:5000/"; //"http://scope-tweetserver.herokuapp.com/";

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


exports.loadTweets = function(onData) {
  d3.json(exports.tweetServerURL, function(error, tweets) {
    if (error !== null || tweets === null) {
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


