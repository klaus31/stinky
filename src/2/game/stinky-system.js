var StinkySystem = function() {

  if (!Data.parkour) throw 'Data.parkour must be set';

  var hole = DataUtil.getNextHole();

  var stinky = new Stinky();
  var toilet = new Toilett();
  var stinkyThrow = new Throw();
  var stinkyPoints = new StinkyPoints();
  var board = new Board();
  var parkourInfo = new ParkourInfo();
  var platforms = new Platforms(hole);
  var backgroundColor = '#AAA';
  var backgroundImage = false;

  this.preload = function() {
    board.preload();
    toilet.preload();
    stinky.preload();
    parkourInfo.preload();
    platforms.preload();
    if (hole.bgcolor) {
      backgroundColor = hole.bgcolor;
    }
    if (hole.bgimage) {
      backgroundImage = 'bg-image';
      // TODO this is theme specific
      game.load.image(backgroundImage, 'parkours/' + Data.parkour.name + '/' + hole.layerName + '.png');
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

    if (backgroundColor) game.stage.backgroundColor = backgroundColor;
    if (backgroundImage) game.add.sprite(0, 0, backgroundImage);

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
    platforms.onFireHit(stinky.explode);
    platforms.onGreenHit(onGreenHit);
    parkourInfo.create(hole);
    parkourInfo.onClose(function() {
      stinkyThrow.setBlocked(false);
    })

    toilet.onFlushDown(function() {
      stinkyThrow.setBlocked(true);
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
        stinkyThrow.setBlocked(true);
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