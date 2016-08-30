var Toilett = function() {
  var me = this;
  var width = 100;
  var height = 100;
  var name = 'toilet';
  var file = 'game/'+ name + '.png';
  var nameOpen = 'toilet-open';
  var fileOpen = 'game/'+ nameOpen + '.png';
  var sprite;
  var thingToFlushDown;
  var speedForFlushDown = 2;
  var soundFlush;

  this.preload = function() {
    game.load.spritesheet(name, file, width, height);
    game.load.image(nameOpen, fileOpen, width, height);
    game.load.audio('toilet-flush', 'game/toilet-flush.mp3');
  }

  this.create = function() {
    var posX = game.world.width - width;
    var posY = game.world.height - height;
    sprite = game.add.sprite(posX, posY, name);
    soundFlush = game.add.audio('toilet-flush');
  };

  this.postcreate = function() {
    var posX = game.world.width - width;
    var posY = game.world.height - height;
    game.add.sprite(posX, posY, nameOpen);
  };

  this.isHit = function(thingThrown) {
    if (!sprite) throw 'sprite not created yet';
    if (!thingThrown) throw 'thingThrown npe';
    if (!thingThrown.getPosition) throw 'thingThrown must implement getPosition';
    if (!thingThrown.getWidth) throw 'thingThrown must implement getWidth';
    if (!thingThrown.getHeight) throw 'thingThrown must implement getHeight';
    var position = thingThrown.getPosition();
    var into = function() {
      return sprite.position.x + 5 < position.x &&
        sprite.position.x + width - 30 > position.x &&
        sprite.position.y < position.y &&
        sprite.position.y + height - 30 > position.y;
    };
    var any = function() {
      return sprite.position.x < position.x + thingThrown.getWidth() &&
        sprite.position.x + width > position.x &&
        sprite.position.y < position.y + thingThrown.getHeight() &&
        sprite.position.y + height > position.y &&
        // not just whitespace:
        (sprite.position.x + 55 < position.x + thingThrown.getWidth() ||
          sprite.position.y + 55 < position.y + thingThrown.getHeight());
    }
    return {
      into: into,
      any: any
    }
  }


  this.isHitButNotInto = function(thingThrown) {
    if (!sprite) throw 'sprite not created yet';
  };

  this.flushDown = function(thingToFlush) {
    if (!thingToFlush.kill) throw 'thingToFlush must implement kill';
    if (!thingToFlush.setPosition) throw 'thingToFlush must implement setPosition';
    if (!thingToFlush.stopMoving) throw 'thingToFlush must implement stopMoving';
    if (!thingToFlushDown) {
      thingToFlush.stopMoving();
      thingToFlush.setPosition(sprite.x + 22, sprite.y);
      thingToFlushDown = thingToFlush;
      soundFlush.play();
    }
  };

  this.update = function() {
    if (thingToFlushDown) {
      var currentPosition = thingToFlushDown.getPosition();
      var isCompletelyFlushDown = currentPosition.y > sprite.position.y + (height / 2);
      if (isCompletelyFlushDown) {
        thingToFlushDown.kill();
        thingToFlushDown = false;
      } else {
        thingToFlushDown.setPosition(currentPosition.x, currentPosition.y + 2);
      }
    }
  };
};
