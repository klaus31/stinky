var game = new Phaser.Game(960, 600, Phaser.CANVAS, '');
game.state.add('MainMenu', new MainMenu());
game.state.start('MainMenu');
