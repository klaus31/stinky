var Toilett = function() {
  var width = 100;
  var height = 100;
  var name = 'toilett';
  var file = name + '.png';

  this.preload = function() {
    game.load.spritesheet(name, file, width, height);
  }

  this.create = function() {
    var posX = game.world.width - width;
    var posY = game.world.height / 2;
    game.add.sprite(posX, posY, name);
  };

};

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
    sprite.body.velocity.x = end.x - start.x;
    sprite.body.velocity.y = end.y - start.y;
    start = false;
    end = false;
  }
};

var Stinky = function() {
  var width = 30;
  var height = 30;
  var name = 'stinky';
  var file = name + '.png';
  var sprite;

  this.preload = function() {
    game.load.spritesheet(name, file, width, height);
  }

  this.isHit = function(pointer) {
    if (!sprite) throw 'sprite not created yet';
    var bodies = game.physics.p2.hitTest(pointer.position, [sprite.body]);
    return !!bodies.length;
  };

  this.create = function() {
    var posX = 50;
    var posY = game.world.height / 2;
    sprite = game.add.sprite(posX, posY, name);
    game.physics.p2.enable(sprite);
    sprite.body.collideWorldBounds = true;
    // FIXME animation geht nicht
    sprite.animations.add('infinite', [0, 1, 2, 1], 10, true);
  };

  this.throw = function(aThrow) {
    aThrow.doThrow(sprite);
  };

};

var StinkySystem = function() {

  var stinkyScreen = new StinkyScreen();
  var stinky = new Stinky();
  var toilett = new Toilett();
  var gravity = {};
  gravity.y = 100;
  var backgroundColor = '#FF77DD';
  var stinkyThrow = new Throw();

  var preload = function() {
    stinky.preload();
    toilett.preload();
  };

  var onGameInputDown = function(pointer) {
    if (stinky.isHit(pointer)) {
      stinkyThrow.start(pointer);
    } else {
      stinkyThrow.abort();
    }
  };

  var onGameInputUp = function(pointer) {
    if (stinkyThrow.isStarted()) {
      stinkyThrow.end(pointer);
      stinky.throw(stinkyThrow);
    }
  };

  var create = function() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.stage.backgroundColor = backgroundColor;
    game.physics.p2.gravity.y = gravity.y;
    game.input.onDown.add(onGameInputDown, this);
    game.input.onUp.add(onGameInputUp, this);
    stinky.create();
    toilett.create();
  };

  var update = function() {};

  var game = new Phaser.Game(stinkyScreen.getWidth(), stinkyScreen.getHeight(), Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });

  this.getGame = function() {
    return game;
  }
};

var stinkySystem = new StinkySystem();
var game = stinkySystem.getGame();