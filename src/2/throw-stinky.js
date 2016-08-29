var hole = StinkyConfig.parkours[0].holes[0];
var game = new Phaser.Game(960, 600, Phaser.CANVAS, '');
game.state.add('Game', new StinkySystem(hole));
game.state.start('Game');
