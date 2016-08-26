var Throw = function() {

  var start = false;
  var end = false;
  var stinkyLine;
  var offset;

  this.create = function() {
    stinkyLine = new StinkyLine();
  }

  this.start = function(pointer, subjectPosition) {
    start = subjectPosition;
    offset = {
      x: pointer.x - subjectPosition.x,
      y: pointer.y - subjectPosition.y
    }
  }

  this.update = function() {
    if (start) {
      stinkyLine.setTo(start, getEnd());
    }
  }

  var getEnd = function() {
    return {
      x: game.input.position.x - offset.x,
      y: game.input.position.y - offset.y
    };
  }

  this.abort = function() {
    start = false;
    end = false;
    offset = false;
  }

  this.isStarted = function() {
    return !!start;
  }

  this.end = function(pointer) {
    end = getEnd();
  }

  this.doThrow = function(sprite) {
    sprite.body.velocity.x = (end.x - start.x) * 2;
    sprite.body.velocity.y = (end.y - start.y) * 2;
    start = false;
    end = false;
    offset = false;
    stinkyLine.hide();
  }

  this.render = function() {
    stinkyLine.render();
  }
};
