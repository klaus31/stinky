var Splash = function() {
  this.preload = function() {
    game.load.image('splash-presents', 'splash/stinky-games-presents.png');
    game.load.image('splash-golf', 'splash/stinky-golf.png');
    game.load.audio('sound', 'splash/ass-leave.mp3');
  }

  var presents;

  this.create = function() {
    var x = 160;
    var y = 55;
    var showPresents = function() {
      presents = game.add.sprite(x, y, 'splash-presents');
    }
    var showGolf = function() {
      presents.kill();
      game.add.sprite(x, y, 'splash-golf');
    }

    var playAssLeave = function() {
      var sound = game.add.audio('sound');
      sound.play();
    }
    var showMainMenu = function() {
      game.state.start('MainMenu');
    }
    game.stage.backgroundColor = '#FFF';
    showPresents();
    var timeline = 0;
    window.setTimeout(playAssLeave, timeline += 1000);
    window.setTimeout(showGolf, timeline += 4500);
    window.setTimeout(showMainMenu, timeline += 3000);
  }
  this.update = function() {}

};