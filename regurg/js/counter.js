
d3 = require("d3");

exports.Counter = function Counter(selector, value) {
    this.selector = selector;
    this.value = 0;
    this.update(value);
};

function toDigits(value) {
    return value.toString().split("");
}

exports.Counter.prototype.update = function(value) {
    var oldDigits = toDigits(this.value);
    var digits = toDigits(value);
    this.value = value;

    var duration = 300,
        offset = 15;    

    var spans = d3.select(this.selector).selectAll("span")
                  .data(digits, function(_, i) {
                      return digits.length - i - 1;
                  });

    spans.filter(function(digit, i) { return digit != oldDigits[i]; })
         .style("top", 0)
         .transition().duration(duration)
         .style("opacity", 0)
         .style("top", -offset)
         .transition().duration(duration/2)
         .text(function(digit) { return digit; })
         .style("top", offset)
         .transition().duration(duration)
         .style("opacity", 1)
         .style("top", 0);

    spans.enter().append("span")
                 .text(function (digit) { return digit; })
                 .style("opacity", 0)
                 .style("top", offset)
                 .style("position", "relative")
                 .transition().duration(duration)
                 .transition().duration(duration)
                 .style("opacity", 1)
                 .style("top", 0);

    spans.exit().transition().duration(500).style("opacity", 0).remove();
};