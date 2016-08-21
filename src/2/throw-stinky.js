var Toilett = function() {
  var width = 100;
  var height = 100;
  var name = 'toilett';
  var file = name + '.png';

  this.preload = function(){
    game.load.spritesheet(name, file, width, height);
  }
  this.create = function() {
    var posX = game.world.width - width;
    var posY = game.world.height / 2;
    game.add.sprite(posX, posY, name);
  };

};

var Stinky = function() {
  var width = 30;
  var height = 30;
  var name = 'stinky';
  var file = name + '.png';

  this.preload = function(){
    game.load.spritesheet(name, file, width, height);
  }
  this.create = function() {
    var posX = 50;
    var posY = game.world.height / 2;
    var stinky = game.add.sprite(posX, posY, name);
    game.physics.p2.enable(stinky);
    stinky.body.collideWorldBounds = true;
    // FIXME animation geht nicht
    stinky.animations.add('infinite', [0, 1, 2, 1], 10, true);
    stinky.body.velocity.x = 200;
    stinky.body.velocity.y = -200;
  };

};

var StinkySystem = function() {

  var stinkyScreen = new StinkyScreen();
  var stinky = new Stinky();
  var toilett = new Toilett();

  var preload = function() {
    stinky.preload();
    toilett.preload();
  };

  var create = function() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.stage.backgroundColor = "#FF77DD";
    game.physics.p2.gravity.y = 100;
    stinky.create();
    toilett.create();
  };

  var update = function() {
  };

  var game = new Phaser.Game(stinkyScreen.getWidth(), stinkyScreen.getHeight(), Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
  });

  this.getGame = function() {
    return game;
  }
};

var stinkySystem = new StinkySystem();
var game = stinkySystem.getGame();
