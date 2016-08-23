var Stinky = function() {
  const width = 30;
  const height = 30;
  const gravityY = 100;
  const name = 'stinky';
  const file = name + '.png';
  var sprite;
  var me = this;
  /* flag: true, if method kill will be called */
  var isBeingKilled;
  var onKilledFuncs = [];

  this.getWidth = function() {
    return width;
  }
  this.getHeight = function() {
    return height;
  }

  this.preload = function() {
    game.load.spritesheet(name, file, width, height);
  }

  this.markAsWillBeKilled = function() {
    isBeingKilled = true;
  }

  this.isBeingKilled = function() {
    return isBeingKilled;
  }

  this.update = function() {
    if (hitWorldBounds()) {
      me.markAsWillBeKilled();
      me.explode();
    }
    if (sprite.animations.currentAnim.isFinished) {
      sprite.kill();
      sprite.animations.currentAnim.isFinished = false;
    }
  }

  this.explode = function() {
    sprite.animations.play('explode');
  }

  var hitWorldBounds = function() {
    return sprite.body.blocked.up || sprite.body.blocked.right || sprite.body.blocked.down || sprite.body.blocked.left;
  }

  this.create = function() {
    var posX = 50;
    var posY = game.world.height / 2;
    isBeingKilled = false;
    sprite = game.add.sprite(posX, posY, name);
    game.physics.arcade.enable(sprite);
    sprite.body.collideWorldBounds = true;
    sprite.body.bounce.set(.3);
    sprite.animations.add('infinite', [0, 1, 2, 1], 10, true);
    sprite.animations.play('infinite');
    sprite.animations.add('explode', [3, 4, 5, 6, 7, 8, 9], 10, false);
    sprite.events.onKilled.add(recreate);
    var i = onKilledFuncs.length;
    while(i--) me.onKilledAdd(onKilledFuncs[i]);
  }

  this.onKilledAdd = function(func) {
    sprite.events.onKilled.add(func);
    if(!onKilledFuncs.includes(func))
    onKilledFuncs.push(func);
  }

  this.throw = function(aThrow) {
    if (!(aThrow instanceof Throw)) throw 'aThrow must be instance of Throw';
    sprite.body.gravity.y = gravityY;
    aThrow.doThrow(sprite);
  }

  this.getPosition = function() {
    return sprite.position;
  }

  this.stopMoving = function() {
    sprite.moves = false;
    sprite.body.gravity.y = 0;
    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
  }

  this.setPosition = function(x, y) {
    sprite.x = x;
    sprite.y = y;
  }

  this.kill = function() {
    sprite.kill();
  }

  var recreate = function() {
    me.stopMoving();
    me.create();
  }

};
