var Stinky = function() {

  const width = 30;
  const height = 30;
  const name = 'stinky';
  const file = name + '.png';

  var sprite;
  var me = this;
  /* flag: true, if method kill will be called */
  var isBeingKilled;
  var onKilledFuncs = [];
  var positionHistorie = [];
  // FIXME this is dirty, because it assumes a flying stinky at first position
  var inThrowMode = true;

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
  }

  this.explode = function() {
    me.stopMoving();
    var ani = sprite.animations.play('explode');
    ani.killOnComplete = true;
  }

  var hitWorldBounds = function() {
    return sprite.position.x == 0 ||
      sprite.position.y == 0 ||
      sprite.body.blocked.right && sprite.position.x >= game.width - width - 10 ||
      sprite.body.blocked.down && sprite.position.y >= game.height - height;
  }

  var addPositionToHistorie = function() {
    positionHistorie.push(me.getPosition());
  }

  this.hitGreen = function() {
    me.stopMoving();
    if (inThrowMode) {
      addPositionToHistorie();
      inThrowMode = false;
    }
  }

  this.create = function(position) {
    if (!position) throw 'need a starting position';
    isBeingKilled = false;
    sprite = game.add.sprite(position.x, position.y, name);
    game.physics.enable(sprite);
    sprite.body.collideWorldBounds = true;
    sprite.animations.add('infinite', [0, 1, 2, 1], 10, true);
    sprite.animations.add('explode', [3, 4, 5, 6, 7, 8, 9], 10, false);
    sprite.events.onKilled.add(recreate);
    var i = onKilledFuncs.length;
    while (i--) me.onKilledAdd(onKilledFuncs[i]);
    sprite.animations.play('infinite');
  }

  this.onKilledAdd = function(func) {
    sprite.events.onKilled.add(func);
    if (!onKilledFuncs.includes(func))
      onKilledFuncs.push(func);
  }

  this.throw = function(aThrow) {
    if (!(aThrow instanceof Throw)) throw 'aThrow must be instance of Throw';
    inThrowMode = true;
    aThrow.doThrow(sprite);
  }

  this.getPosition = function() {
    return JSON.parse(JSON.stringify(sprite.position));
  }

  this.getCenterPosition = function() {
    return {
      x: sprite.position.x + width / 2,
      y: sprite.position.y + height / 2
    }
  }

  this.stopMoving = function() {
    sprite.moves = false;
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
    me.create(positionHistorie[positionHistorie.length - 1]);
    if (positionHistorie.length != 1) {
      me.stopMoving();
    }
  }

  this.getSprite = function() {
    return sprite;
  }

};