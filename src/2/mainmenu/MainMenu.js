var MainMenu = function () {

	this.preload = function() {
		game.load.image('stinky-img', 'mainmenu/stinky-img.png');
		// TODO check game.load.atlas for button
		game.load.image('start-button', 'mainmenu/start-button.png');
	}

	this.create= function () {
		game.add.sprite(0, 0, 'stinky-img');
		// TODO when game.load.atlas check:
		// game.add.button(400, 600, 'start-button', startGame, game, 'buttonOver', 'buttonOut', 'buttonOver');
		game.add.button(400, 200, 'start-button', startGame, game);
	}

	this.update= function () {
	}

	var startGame= function () {
		var hole = StinkyConfig.parkours[0].holes[0];
		game.state.add('Game', new StinkySystem(hole));
		game.state.start('Game');	}

};
