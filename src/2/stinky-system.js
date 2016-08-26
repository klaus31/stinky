var StinkySystem = function() {

  var stinky = new Stinky();
  var toilet = new Toilett();
  var background;
  var backgroundColor = '#FF77DD';
  var backgroundImageName = 'toilet-paper-bg';
  var backgroundImageFile = backgroundImageName + '.png';
  var stinkyThrow = new Throw();
  var stinkyPoints = new StinkyPoints();
  var board = new Board();
  var platforms = new Platforms();

  var preload = function() {
    game.load.image(backgroundImageName, backgroundImageFile, 150, 150);
    board.preload();
    toilet.preload();
    stinky.preload();
    platforms.preload();
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
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.gravity.y = 200;
    game.stage.backgroundColor = backgroundColor;
    background = game.add.tileSprite(0, 0, game.world.width, game.world.height, backgroundImageName);

    game.input.onDown.add(onGameInputDown, this);
    game.input.onUp.add(onGameInputUp, this);

    stinkyPoints.onIncrement(board.updateScore);

    platforms.create();
    board.create();
    toilet.create();
    stinky.create();
    stinky.onKilledAdd(stinkyPoints.incrementTries);
    toilet.postcreate();
    platforms.onWallHit(stinky.explode);
  };

  var update = function() {
    game.physics.arcade.collide(stinky.getSprite(), platforms.getLayer());

    if (!stinky.isBeingKilled()) {
      if (toilet.isHit(stinky).into()) {
        stinky.markAsWillBeKilled();
        toilet.flushDown(stinky);
        stinkyPoints.incrementPoints();
      } else if (toilet.isHit(stinky).any()) {
        stinky.markAsWillBeKilled();
        stinky.explode();
      }
    }
    toilet.update();
    stinky.update();

    background.tilePosition.x -= 2;
    background.tilePosition.y -= 1;
  };

  var game = new Phaser.Game(960, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });

  this.getGame = function() {
    return game;
  }
};