var StinkyPoints = function() {

  var points = 0;
  var tries = 0;
  var board = new Board();
  var onIncrement;

  this.incrementPoints = function() {
    points++;
    if (onIncrement)
      onIncrement(tries, points);
  }

  this.incrementTries = function() {
    tries++;
    if (onIncrement)
      onIncrement(tries, points);
  }

  this.onIncrement = function(func) {
    onIncrement = func;
  }
};