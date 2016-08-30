var StinkySystem = function() {

  if (!Data.parkour) throw 'Data.parkour must be set';

  var hole = DataUtil.getNextHole();

  var stinky = new Stinky();
  var toilet = new Toilett();
  var background;
  var backgroundColor = '#FF77DD';
  var backgroundImageName = 'toilet-paper-bg';
  var backgroundImageFile = 'game/' + backgroundImageName + '.png';
  var stinkyThrow = new Throw();
  var stinkyPoints = new StinkyPoints();
  var board = new Board();
  var platforms = new Platforms();

  this.preload = function() {
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
      stinkyPoints.onIncrement(function(tries, hits) {
        board.updateScore(tries, hits);
        hole.tries = tries;
      });
      stinkyPoints.incrementTries();
    } else {
      stinkyThrow.abort();
    }
  };

  this.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = backgroundColor;
    background = game.add.tileSprite(0, 0, game.world.width, game.world.height, backgroundImageName);

    game.input.onDown.add(onGameInputDown, this);
    game.input.onUp.add(onGameInputUp, this);

    stinkyPoints.onIncrement(board.updateScore);

    platforms.create(hole.layerName);
    board.create(hole.par);
    toilet.create();
    stinky.create(hole.stinky.options);
    stinkyThrow.create();
    toilet.postcreate();
    platforms.onWallHit(stinky.explode);
    platforms.onGreenHit(onGreenHit);
  };

  var onGreenHit = function() {
    stinky.hitGreen();
  }

  this.update = function() {
    game.physics.arcade.collide(stinky.getSprite(), platforms.getLayer());

    stinkyThrow.update();

    if (!stinky.isBeingKilled()) {
      if (toilet.isHit(stinky).into()) {
        stinky.markAsWillBeKilled();
        toilet.flushDown(stinky, function() {
          stinkyPoints.incrementPoints();
          hole.playedAlready = true;
          game.state.start('Result');
        });
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

  this.render = function() {
    stinkyThrow.render();
  }
};
