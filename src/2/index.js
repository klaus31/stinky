var game = new Phaser.Game(960, 600, Phaser.CANVAS, '');
game.state.add('Splash', new Splash());
game.state.add('MainMenu', new MainMenu());
game.state.add('Result', new Result());

if (window.location.hash.match('#[1-9][0-8]?$')) {
  Data.parkour = Data.parkours[0];
  var level = window.location.hash.substr(1) - 0;
  var i = 1;
  while (i < level) {
    var hole = DataUtil.getHole(i);
    hole.playedAlready = true;
    hole.tries = 1;
    i++;
  }
  game.state.add('game-' + Data.parkour.name + '-1', new StinkySystem());
  game.state.start('game-' + Data.parkour.name + '-1');
} else {
  game.state.start('Splash');
}