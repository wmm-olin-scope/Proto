
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
    this.id_str = tweetObj.id_str;
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


var fakeTweets = [];

var graham = [
    "I just #regurgitated a bunch of #Napoleon facts. I'd rather it were #Neapolitan ice cream!",
    "Who CARES that the square root of 2 is 1.41421356237... #regurgitated",
    "I'm #sick of having to #regurgitate facts in history class!",
    "Memorizing the definition of a metaphor is like having to #regurgitate everywhere",
    "Who would win in a fight? Hannibal and his elephants or me as I #regurgitate",
    "I can prove that AB == CD by the axiom of #regurgitated",
    "Another literary device in #TheCatcherInTheRye is dramatic irony. #regurgitated",
    "I #regurgitated a bunch of facts in class today... now that they're gone, I feel much better!",
    "That moment when you #regurgitate the wrong answer in class but nobody notices.",
    "Please don't make me #regurgitate any more facts! I want to learn, not memorize things!",
    "Just had to #regurgitate the years all the presidents took office. School sucks.",
    "Kids have to #regurgitate the periodic table for school. Maybe its time for homeschooling.",
    "had to #regurgitate pi today. why cant i use a calculatr",
    "teach made me #regurgitate the constitution. WTF!?",
    "Why should my kids #regurgitate physics formulas when they could be learning to solve physics problems?",
    "No one in my daughter's class knows how to *use* the spelling words they #regurgitate every week. That's crazy.",
    "DO THEY THINK WERE DUMB?! I CAN JUST USE WIKIPEDIA #REGURGITATE",
    "Just got back my SATs :/ Other kids did well because they know how to #regurgitate",
    "When am I going to finally learn Spanish? At the moment, prof. just wants us to #regurgitate vocab.",
    "Going to convince my hubby to move back to Finland. Children not knowing anything but to #regurgitate",
];
for (var i = 0; i < graham.length; i++) {
    fakeTweets.push(new exports.Tweet({
        author: {name: "instagraham", profile_image_url: null},
        text: graham[i],
        entities: [],
        created_at: 0,
        id_str: "" + fakeTweets.length,
   }));
}

fakeTweets = _.shuffle(fakeTweets);

exports.FakeTweetLoader = function FakeTweetLoader(onTweets, timeChunk) {
    this.timeChunk = timeChunk || 5000;
    this.lastLoadTime = 0;
    this.intervalID = null;
    this.onTweets = onTweets;
    this.i = 0;
};

exports.FakeTweetLoader.prototype.start = function() {
    this.doLoad();
    
    var this_ = this;
    this.intervalID = setInterval(function() { this_.doLoad(); }, 
                                  this.timeChunk);
};

exports.FakeTweetLoader.prototype.doLoad = function() {
    this.onTweets([fakeTweets[this.i]]);
    this.i++;
};

exports.FakeTweetLoader.prototype.stop = function() {
    if (this.intervalID !== null) clearInterval(this.intervalID);
};