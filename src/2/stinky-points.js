var StinkyPoints = function() {
  var points = 0;
  var tries = 0;
  this.incrementPoints = function() {
    points++;
    console.info('points: ' + points);
  }
  this.incrementTries = function() {
    tries++;
    console.info('tries: ' + tries);
  }
};