var StinkyPoints = function() {

  var tries = 0;
  var onIncrement;

  this.incrementTries = function() {
    tries++;
    if (onIncrement)
      onIncrement(tries);
  }

  this.onIncrement = function(func) {
    onIncrement = func;
  }
};
