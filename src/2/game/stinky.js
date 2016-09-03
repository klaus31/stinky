var Stinky = function() {

  const width = 30;
  const height = 30;
  const name = 'stinky';
  const file = 'game/' + name + '.png';

  var sprite;
  var me = this;
  /* flag: true, if method kill will be called */
  var isBeingKilled;
  var onKilledFuncs = [];
  var positionHistorie = [];
  // FIXME this is dirty, because it assumes a flying stinky at first position
  var inThrowMode = true;
  var gravity;
  var onRecreate;
  var soundExplode;

  this.getWidth = function() {
    return width;
  }
  this.onRecreate = function(func) {
    onRecreate = func;
  }
  this.getHeight = function() {
    return height;
  }

  this.preload = function() {
    game.load.spritesheet(name, file, width, height);
    game.load.audio('sound-explode', 'game/stinky-explode.mp3');
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

  var exploding = false;

  this.explode = function() {
    if (!exploding) {
      me.stopMoving();
      soundExplode.play();
      var ani = sprite.animations.play('explode');
      ani.killOnComplete = true;
      exploding = true;
    }
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
    if (inThrowMode) {
      me.stopMoving();
      addPositionToHistorie();
      inThrowMode = false;
    }
  }

  this.create = function(options) {
    if (!options.position) throw 'need a starting position';
    if (!options.gravity && options.gravity !== 0) throw 'need a gravity';
    if (!options.bounce && options.bounce !== 0) throw 'need a bounce';
    soundExplode = game.add.audio('sound-explode');
    gravity = options.gravity;
    isBeingKilled = false;
    sprite = game.add.sprite(options.position.x, options.position.y, name);
    game.physics.enable(sprite);
    sprite.body.collideWorldBounds = true;
    sprite.animations.add('infinite', [0, 1, 2, 1], 5, true);
    sprite.animations.add('explode', [3, 4, 5, 6, 7, 8, 9], 10, false);
    sprite.events.onKilled.add(function() {
      recreate();
      exploding = false;
    });
    var i = onKilledFuncs.length;
    while (i--) me.onKilledAdd(onKilledFuncs[i]);
    sprite.animations.play('infinite');
    sprite.body.gravity.y = gravity;
    sprite.body.bounce.set(options.bounce);
  }

  this.onKilledAdd = function(func) {
    sprite.events.onKilled.add(func);
    if (!onKilledFuncs.includes(func))
      onKilledFuncs.push(func);
  }

  this.throw = function(aThrow) {
    if (!(aThrow instanceof Throw)) throw 'aThrow must be instance of Throw';
    sprite.body.gravity.y = gravity;
    window.setTimeout(function() {
      /*
      dirty hack: stinky kann im grün landenund sich in den stein eingraben. Das Problemist, dass dann beim nächsten throw estinky wieder im grün hängen bleibt. Leider kann ich es nicht vermeiden, dass stinky imgrünhngen bleibt, was sehrviel besser wäre. map.setTileIndexCallback überschreibt nämlich den "default" callback, an denichso nicht rankomme.
      */
      inThrowMode = true;
    }, 200);
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
    var options = {
      position: positionHistorie[positionHistorie.length - 1],
      gravity: gravity
    }
    me.create(options);
    if (positionHistorie.length != 1) {
      me.stopMoving();
    }
    if (onRecreate) onRecreate();
  }

  this.getSprite = function() {
    return sprite;
  }

};
