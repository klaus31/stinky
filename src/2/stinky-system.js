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
