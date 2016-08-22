var Toilett = function() {
  var width = 100;
  var height = 100;
  var name = 'toilet';
  var file = name + '.png';
  var nameOpen = 'toilet-open';
  var fileOpen = nameOpen + '.png';
  var sprite;
  var thingToFlushDown;
  var speedForFlushDown = 2;

  this.preload = function() {
    game.load.spritesheet(name, file, width, height);
    game.load.image(nameOpen, fileOpen, width, height);
  }

  this.create = function() {
    var posX = game.world.width - width;
    var posY = game.world.height / 2;
    sprite = game.add.sprite(posX, posY, name);
  };

  this.postcreate = function() {
    var posX = game.world.width - width;
    var posY = game.world.height / 2;
    game.add.sprite(posX, posY, nameOpen);
  };

  this.isHit = function(position) {
    if (!sprite) throw 'sprite not created yet';
    return sprite.position.x < position.x &&
      sprite.position.x + width > position.x &&
      sprite.position.y < position.y &&
      sprite.position.y + height > position.y;
  };

  this.flushDown = function(garbage) {
    if (!garbage.kill) throw 'garbage must implement kill';
    if (!garbage.setPosition) throw 'garbage must implement setPosition';
    if (!garbage.stopMoving) throw 'garbage must implement stopMoving';
    if (!thingToFlushDown) {
      garbage.stopMoving();
      garbage.setPosition(sprite.x + 22, sprite.y);
      thingToFlushDown = garbage;
    }
  };

  this.update = function() {
    if (thingToFlushDown) {
      var currentPosition = thingToFlushDown.getPosition();
      var isCompletelyFlushDown = currentPosition.y > sprite.position.y + (height / 2);
      if (isCompletelyFlushDown) {
        thingToFlushDown.kill();
        delete thingToFlushDown;
      } else {
        thingToFlushDown.setPosition(currentPosition.x, currentPosition.y + 2);
      }
    }
  };
};