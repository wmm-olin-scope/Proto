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
