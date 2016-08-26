var StinkyLine = function() {

  var line = new Phaser.Line(0, 0, 0, 0);
  var color = 'rgb(255,255,255)';

  this.setTo = function(start, end) {
    line.setTo(start.x, start.y, end.x, end.y);
  }

  this.render = function() {
    game.debug.geom(line, color);
  }

  this.hide = function() {
    line.setTo(0,0,0,0);
  }

}
