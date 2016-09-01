var StinkySystem = function() {

  if (!Data.parkour) throw 'Data.parkour must be set';

  var hole = DataUtil.getNextHole();

  var stinky = new Stinky();
  var toilet = new Toilett();
  var stinkyThrow = new Throw();
  var stinkyPoints = new StinkyPoints();
  var board = new Board();
  var platforms = new Platforms(hole);
  var backgroundColor='#AAA';
  var backgroundImage=false;

  this.preload = function() {
    board.preload();
    toilet.preload();
    stinky.preload();
    platforms.preload();
    if(hole.background) {
      if(hole.background.color) {
        backgroundColor = hole.background.color;
      }
      if(hole.background.image) {
        backgroundImage = 'bg-image';
        game.load.image(backgroundImage, hole.background.image);
      }
    }
  };

  var onGameInputDown = function(pointer) {
    stinkyThrow.start(pointer, stinky.getCenterPosition());
  };

  var onGameInputUp = function(pointer) {
    if (stinkyThrow.isStarted()) {
      stinkyThrow.end(pointer);
      stinky.throw(stinkyThrow);
      stinkyPoints.onIncrement(function(tries) {
        board.updateScore(tries);
        hole.tries = tries;
      });
      stinkyPoints.incrementTries();
    } else {
      stinkyThrow.abort();
    }
  };

  this.create = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    if(backgroundColor) game.stage.backgroundColor = backgroundColor;
    if(backgroundImage) game.add.sprite(0, 0, backgroundImage);

    game.input.onDown.add(onGameInputDown, this);
    game.input.onUp.add(onGameInputUp, this);

    stinkyPoints.onIncrement(board.updateScore);

    platforms.create(hole.layerName);
    board.create(hole.par);
    toilet.create();
    stinky.create(hole.stinky.options);
    stinkyThrow.create();
    stinky.onRecreate(toilet.postcreate);
    toilet.postcreate();
    platforms.onWallHit(stinky.explode);
    platforms.onGreenHit(onGreenHit);

    toilet.onFlushDown(function() {
      hole.playedAlready = true;
      game.state.start('Result');
    });

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
        toilet.flushDown(stinky);
      } else if (toilet.isHit(stinky).any()) {
        stinky.markAsWillBeKilled();
        stinky.explode();
      }
    }
    toilet.update();
    stinky.update();
  };

  this.render = function() {
    stinkyThrow.render();
  }
};
