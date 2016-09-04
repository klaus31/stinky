var MainMenu = function() {

  var spriteParkourLeftCharflush;
  var flushShound;

  // XXX screams for Oop
  this.preload = function() {
    var preloadMenuForParkourLeft = function() {
      game.load.image('parkour-1', 'mainmenu/parkour-1.png');
      var atlasBuilder = new AtlasBuilder('parkour-1-buttons', 222, 62);
      atlasBuilder.addFrame('normal', 0, 0, 74, 62);
      atlasBuilder.addFrame('hover', 74, 0, 74, 62);
      atlasBuilder.addFrame('down', 148, 0, 74, 62);
      game.load.atlas('parkour-1-buttons', 'mainmenu/parkour-1-buttons.png', null, atlasBuilder.build());
      game.load.spritesheet('parkourLeftCharflush', 'mainmenu/parkour-poo-beginner.png', 120, 117);
    }

    var preloadMenuForParkourRight = function() {
      game.load.image('parkour-2', 'mainmenu/parkour-2.png');
      var atlasBuilder = new AtlasBuilder('parkour-2-buttons', 138, 45);
      atlasBuilder.addFrame('normal', 0, 0, 46, 45);
      atlasBuilder.addFrame('hover', 46, 0, 46, 45);
      atlasBuilder.addFrame('down', 92, 0, 46, 45);
      game.load.atlas('parkour-2-buttons', 'mainmenu/parkour-2-buttons.png', null, atlasBuilder.build());
      game.load.spritesheet('parkourRightCharToiletLidBuyButton', 'mainmenu/toilet-lid-99-ct.png', 115, 112);
    }

    game.load.audio('toilet-flush', 'mainmenu/toilet-flush-2.mp3');
    preloadMenuForParkourLeft();
    preloadMenuForParkourRight();

  }

  this.create = function() {
    var innerCreate = function() {
      game.add.sprite(0, 0, 'parkour-1');
      game.add.sprite(game.world.width / 2, 0, 'parkour-2');

      game.add.button(207, 71, 'parkour-1-buttons', startGameParkourLeft, game, 'hover', 'normal', 'down');
      game.add.button(game.world.width / 2 + 220, 143, 'parkour-2-buttons', payFirst, game, 'hover', 'normal', 'down');
      spriteParkourLeftCharflush = game.add.sprite(194, 397, 'parkourLeftCharflush');
      spriteParkourLeftCharflush.animations.add('parkourLeftCharflushA', null, 5);
      game.add.sprite(game.world.width / 10 * 7 - 5, 290, 'parkourRightCharToiletLidBuyButton');

    }
    flushShound = game.add.audio('toilet-flush');
    game.sound.setDecodedCallback([flushShound], innerCreate, this);
  }

  var startGameParkourLeft = function() {
    startGame('beginner');
  }

  this.update = function() {}

  var payFirst = function() {
    // TODO just a dummy
    console.info('Please give money ...');
  }

  var startGame = function(parkourName) {
    var i = Data.parkours.length;
    var parkour;
    while (i--) {
      if (Data.parkours[i].name == parkourName) parkour = Data.parkours[i];
    }

    if (!parkour) throw 'parkour with name ' + parkourName + ' not known';
    flushShound.play();
    var ani = spriteParkourLeftCharflush.animations.play('parkourLeftCharflushA');
    ani.killOnComplete = true;
    spriteParkourLeftCharflush.events.onKilled.add(
      function() {
        Data.parkour = parkour;
        game.state.add('game-' + parkour.name + '-1', new StinkySystem());
        game.state.start('game-' + parkour.name + '-1');
      });
  }

};