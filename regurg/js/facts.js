d3 = require("d3");

exports.FactDisplay = function Facts(selector, text) {
    this.selector = selector;
    this.node = d3.select(selector);
};

exports.FactDisplay.prototype.update = function() {
	var facts = ["number of digits of pi memorized",
        "most digits memorised in 2 seconds",
        "most binary digits memorised in 3 seconds",
        "most binary digits memorised in 1 minute",
        "most binary digits memorised in 5 minutes",
        "most spoken numbers",
        "most written numbers memorized in 1 minute",
        "most words memorized in 15 minutes",
        "most cards memorized",
        "number of names and faces memorized in 15 minutes",
        "number of historic dates memorized",
        "number of abstract images memorized"
        ];
    var currentFact = facts[(Math.random()*facts.length)|0];
    string = "That's more than the record for the " + currentFact + "!";

    this.node.style("opacity", 1)
        .transition().duration(500)
        .style("opacity", 0)
        .transition().duration(10)
        .text(string)
        .transition().duration(500)
        .style("opacity", 1);
};