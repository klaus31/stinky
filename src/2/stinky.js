var Stinky = function() {
  const width = 30;
  const height = 30;
  const gravityY = 100;
  const name = 'stinky';
  const file = name + '.png';
  var sprite;

  this.preload = function() {
    game.load.spritesheet(name, file, width, height);
  }

  this.update = function() {
    sprite.animations.play('infinite');
  }

  this.create = function() {
    var posX = 50;
    var posY = game.world.height / 2;
    sprite = game.add.sprite(posX, posY, name);
    game.physics.arcade.enable(sprite);
    sprite.body.collideWorldBounds = true;
    sprite.animations.add('infinite', [0, 1, 2, 1], 10, true);
  };

  this.throw = function(aThrow) {
    if(!(aThrow instanceof Throw)) throw 'aThrow must be instance of Throw';
    sprite.body.gravity.y = gravityY;
    aThrow.doThrow(sprite);
  };

  this.getPosition = function() {
    return sprite.position;
  };

  this.stopMoving = function() {
    sprite.moves = false;
    sprite.body.gravity.y = 0;
    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
  }

  this.setPosition = function(x,y) {
    sprite.x = x;
    sprite.y = y;
  };

  this.kill = function() {
    sprite.kill();
  }

};
