
_ = require('underscore');

exports.tweetServerURL = "http://localhost:5000/"; //"http://scope-tweetserver.herokuapp.com/";

exports.Tweet = function Tweet(tweetObj) {
    this.user = {name: tweetObj.author.name,
                 screen_name: tweetObj.author.screen_name,
                 id_str: tweetObj.author.id_str,
                 location: tweetObj.author.location,
                 profile_image_url: tweetObj.author.profile_image_url};
    this.text = tweetObj.text;
    this.entities = tweetObj.entities;
    this.geo = tweetObj.geo;
    this.created = new Date(tweetObj.created_at);
    this.coordinates = tweetObj.coordinates;
};


exports.TweetLoader = function TweetLoader(onTweets, timeChunk) {
    this.timeChunk = timeChunk || 5000;
    this.lastLoadTime = 0;
    this.intervalID = null;
    this.onTweets = onTweets;
};

exports.TweetLoader.prototype.start = function() {
    this.doLoad();
    
    var this_ = this;
    this.intervalID = setInterval(function() { this_.doLoad(); }, 
                                  this.timeChunk);
};

exports.TweetLoader.prototype.doLoad = function() {
    var this_ = this;
    var url = exports.tweetServerURL + "?min_time=" + this.lastLoadTime;
    d3.json(url, function(error, tweetObjs) {
        if (error !== null || tweetObjs === null) {
            console.log("Tweet error: ");
            console.log(error);
            return;
        }

        tweets = _.map(tweetObjs, function(obj) { 
            return new exports.Tweet(obj); 
        });
        this_.lastLoadTime = new Date().getTime()/1000;
        this_.onTweets(tweets);
    });
};

exports.TweetLoader.prototype.stop = function() {
    if (this.intervalID !== null) clearInterval(this.intervalID);
};