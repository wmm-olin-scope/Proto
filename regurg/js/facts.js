d3 = require("d3");

exports.Facts = function Facts(selector, text) {
    this.selector = selector;
    this.text = '';
    this.update(text);
};

exports.Facts.prototype.update = function() {
	var facts = ["Digits of Pi memorized",
        "Most digits memorised in 2 seconds",
        "Most binary digits memorised in 3 seconds",
        "Most binary digits memorised in 1 minute",
        "Most binary digits memorised in 5 minutes",
        "Most spoken numbers (spoken at a rate of 1 digit every second)",
        "Most written numbers memorized in 1 minute",
        "Most words memorized in 15 minutes",
        "Most cards memorized",
        "Speed record of a single pack of cards",
        "Record for the number of names and faces memorized in 15 minutes",
        "Record for the number of historic dates memorized",
        "Record for the number of abstract images memorized"
        ]
    var currentFact = facts[int(Math.random()*facts.length)];
    return currentFact
}