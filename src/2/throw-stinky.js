var game = new Phaser.Game(960, 600, Phaser.CANVAS, '');
game.state.add('Splash', new Splash());
game.state.add('MainMenu', new MainMenu());
game.state.add('Result', new Result());
game.state.start('Splash');