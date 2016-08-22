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
    if(!garbage.kill) throw 'garbage must implement kill';
    if(!garbage.setPosition) throw 'garbage must implement setPosition';
    if(!garbage.stopMoving) throw 'garbage must implement stopMoving';
    if(!thingToFlushDown) {
      garbage.stopMoving();
      garbage.setPosition(sprite.x+22, sprite.y);
      thingToFlushDown = garbage;
    }
  };

  this.update = function() {
    if(thingToFlushDown){
      var currentPosition = thingToFlushDown.getPosition();
      var isCompletelyFlushDown = currentPosition.y > sprite.position.y + (height / 2);
      if(isCompletelyFlushDown) {
        thingToFlushDown.kill();
        delete thingToFlushDown;
      } else {
        thingToFlushDown.setPosition(currentPosition.x, currentPosition.y + 2);
      }
    }
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
  const width = 30;
  const height = 30;
  const gravityY = 100;
  const name = 'stinky';
  const file = name + '.png';
  var sprite;

  this.preload = function() {
    game.load.spritesheet(name, file, width, height);
  }

  this.create = function() {
    var posX = 50;
    var posY = game.world.height / 2;
    sprite = game.add.sprite(posX, posY, name);
    game.physics.arcade.enable(sprite);
    sprite.body.collideWorldBounds = true;
    // FIXME animation geht nicht
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

var StinkySystem = function() {

  var stinkyScreen = new StinkyScreen();
  var stinky = new Stinky();
  var toilet = new Toilett();
  var gravity = {};
  gravity.y = 0;
  var backgroundColor = '#FF77DD';
  var stinkyThrow = new Throw();

  var preload = function() {
    toilet.preload();
    stinky.preload();
  };

  var onGameInputDown = function(pointer) {
    stinkyThrow.start(pointer);
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
    toilet.create();
    stinky.create();
    toilet.postcreate();
  };

  var update = function() {
    if(toilet.isHit(stinky.getPosition())) {
      toilet.flushDown(stinky);
    }
    toilet.update();
  };

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
