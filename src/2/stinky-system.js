var StinkySystem = function() {

  const GRAVITY = 100;

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
    stinkyThrow.start(pointer, stinky.getCenterPosition());
  };

  var onGameInputUp = function(pointer) {
    if (stinkyThrow.isStarted()) {
      stinkyThrow.end(pointer);
      stinky.throw(stinkyThrow);
      game.physics.arcade.gravity.y = GRAVITY;
      stinkyPoints.onIncrement(board.updateScore);
      stinkyPoints.incrementTries();
    } else {
      stinkyThrow.abort();
    }
  };

  var create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.gravity.y = GRAVITY;
    game.stage.backgroundColor = backgroundColor;
    background = game.add.tileSprite(0, 0, game.world.width, game.world.height, backgroundImageName);

    game.input.onDown.add(onGameInputDown, this);
    game.input.onUp.add(onGameInputUp, this);

    stinkyPoints.onIncrement(board.updateScore);

//    platforms.create('4-trees');
    platforms.create('green-floor');
    board.create();
    toilet.create();
    stinky.create({
      x: 138,
      y: 400
    });
    stinky.onKilledAdd(onStinkyKilled);
    stinkyThrow.create();
    toilet.postcreate();
    platforms.onWallHit(stinky.explode);
    platforms.onGreenHit(onGreenHit);
  };

  var onStinkyKilled = function() {
    game.physics.arcade.gravity.y = GRAVITY;
  }

  var onGreenHit = function() {
    stinky.hitGreen();
    game.physics.arcade.gravity.y = 0;
  }

  var update = function() {
    game.physics.arcade.collide(stinky.getSprite(), platforms.getLayer());

    stinkyThrow.update();

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

  var render = function() {
    stinkyThrow.render();
  }

  var game = new Phaser.Game(960, 600, Phaser.CANVAS, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
  });

  this.getGame = function() {
    return game;
  }
};
