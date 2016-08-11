var sprites = {
  stinkies: []
};

var keys = {
  stinky: 'stinky',
  background: 'background'
};

var mouseBody;
var stinkiesShot = 0;
var scoreText;

var calculateScoreText = function() {
  return 'Stinkies shot: ' + stinkiesShot;
}

var preload = function() {
  game.load.image(keys.background, 'assets/bg.png');
  game.load.spritesheet(keys.stinky, 'assets/stinky.png', 30, 30);
};

var click = function(pointer) {
  var i = sprites.stinkies.length;
  while(i--){
    var bodies = game.physics.p2.hitTest(pointer.position, [ sprites.stinkies[i].body ]);
    if(bodies.length) {
      sprites.stinkies[i].kill();
      stinkiesShot++;
      scoreText.text = calculateScoreText();
    }
  }
}

var release = function(pointer) {
}

var move = function(pointer, x, y, isDown) {
}

var create = function() {

  var createSystem = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.add.sprite(0, 0, keys.background);
    game.input.onDown.add(click, this);
    game.input.onUp.add(release, this);
    game.input.addMoveCallback(move, this);
    scoreText = game.add.text(16, 16, calculateScoreText(), {
      fontSize: '16px',
      fill: '#000'
    });
  };

  var createStinky = function() {
    var posX = Math.floor(Math.random() * 801);
    var stinky = game.add.sprite(posX, 0, keys.stinky);
    stinky.animations.add('infinite', [0, 1, 2, 1], 10, true);
    game.physics.p2.enable(stinky, false);
    sprites.stinkies.push(stinky);
  };

  createSystem();
  window.setInterval(createStinky, 3000);
};

var update = function() {
  var i = sprites.stinkies.length;
  while(i--) sprites.stinkies[i].animations.play('infinite');
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});
