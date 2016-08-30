var MainMenu = function() {

  this.preload = function() {
    game.load.image('stinky-img', 'mainmenu/stinky-img.png');
    // TODO check game.load.atlas for button
    game.load.image('start-button', 'mainmenu/start-button.png');
  }

  this.create = function() {
    game.add.sprite(0, 0, 'stinky-img');
    // TODO when game.load.atlas check:
    // game.add.button(400, 600, 'start-button', startGame, game, 'buttonOver', 'buttonOut', 'buttonOver');
    game.add.button(400, 200, 'start-button', startGame, game);
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