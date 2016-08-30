var Data = {}; // TODO implement persistence solution
var game = new Phaser.Game(960, 600, Phaser.CANVAS, '');
game.state.add('MainMenu', new MainMenu());
game.state.add('Result', new Result());
game.state.start('Result');