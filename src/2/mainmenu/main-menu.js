var MainMenu = function() {

  this.preload = function() {
    game.load.image('parkour-1', 'mainmenu/parkour-1.png');
    var atlasBuilder = new AtlasBuilder('parkour-1-buttons', 222, 62);
    atlasBuilder.addFrame('normal', 0, 0, 74, 62);
    atlasBuilder.addFrame('hover', 74, 0, 74, 62);
    atlasBuilder.addFrame('down', 148, 0, 74, 62);
    game.load.atlas('parkour-1-buttons', 'mainmenu/parkour-1-buttons.png', null, atlasBuilder.build());

    game.load.image('parkour-2', 'mainmenu/parkour-2.png');
  }

  this.create = function() {
    game.add.sprite(0, 0, 'parkour-1');
    game.add.sprite(game.world.width / 2, 0, 'parkour-2');
    game.add.button(207, 71, 'parkour-1-buttons', startGame, game, 'hover', 'normal', 'down');
  }

  this.update = function() {}

  var startGame = function() {
    // TODO set data from pressed parkour button
    var parkour = 0;
    Data.parkour = StinkyConfig.parkours[parkour];
    game.state.add('game-' + parkour + '-1', new StinkySystem());
    game.state.start('game-' + parkour + '-1');
  }

};
