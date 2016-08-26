var Throw = function() {
  var start = false;
  var end = false;

  this.start = function(pointer) {
    start = {
      x: pointer.position.x - 0,
      y: pointer.position.y - 0
    };
  }

  this.abort = function() {
    start = false;
    end = false;
  }

  this.isStarted = function() {
    return !!start;
  }

  this.end = function(pointer) {
    end = {
      x: pointer.position.x - 0,
      y: pointer.position.y - 0
    };
  }

  this.doThrow = function(sprite) {
    sprite.body.velocity.x = (end.x - start.x) * 2;
    sprite.body.velocity.y = (end.y - start.y) * 2;
    start = false;
    end = false;
  }
};