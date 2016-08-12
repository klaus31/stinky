var sprites = {
  stinkies: []
};

var keys = {
  stinky: 'stinky',
  background: 'background'
};

var mouseBody;
var countStinkiesShot = 0;
var countShot = 0;
var scoreText;

var calculateScoreText = function(hit) {
  var rate = countShot ? Math.floor(countStinkiesShot * 100 / countShot) + '%' : '';
  var rateSymbol = countShot ? (hit ? '↗' : '↘') : '';
  return '🔫 ' + countShot + '   💩 ' + countStinkiesShot + '   ' + rateSymbol + ' ' + rate;
}

var preload = function() {
  game.load.image(keys.background, 'assets/bg.png');
  game.load.spritesheet(keys.stinky, 'assets/stinky.png', 30, 30);
};

var click = function(pointer) {
  var i = sprites.stinkies.length;
  countShot++;
  var hit = false;
  while (i--) {
    var bodies = game.physics.p2.hitTest(pointer.position, [sprites.stinkies[i].body]);
    if (bodies.length) {
      sprites.stinkies[i].shot = true;
      countStinkiesShot++;
      hit = true;
    }
  }
  scoreText.text = calculateScoreText(hit);
}

var release = function(pointer) {}

var move = function(pointer, x, y, isDown) {}

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
    game.physics.p2.gravity.y = 100;
    game.physics.p2.restitution = 0.8;
  };

  var createStinky = function() {
    var posX = 20;
    var posY = 300;
    var stinky = game.add.sprite(posX, posY, keys.stinky);
    game.physics.p2.enable(stinky, false);
    // game.physics.arcade.enable(stinky);
    stinky.body.velocity.x = 200;
    stinky.body.velocity.y = -100;
    stinky.animations.add('infinite', [0, 1, 2, 1], 10, true);
    stinky.animations.add('die', [3, 4, 5, 6, 7, 8, 9], 10, true);
    sprites.stinkies.push(stinky);
  };

  createSystem();
  createStinky();
};

var animationSpeed = 5;

var update = function() {
  var i = sprites.stinkies.length;
  while (i--) {
    if (sprites.stinkies[i].shot) {
      sprites.stinkies[i].stinkiesDieSteps = sprites.stinkies[i].stinkiesDieSteps || 0;
      if (sprites.stinkies[i].stinkiesDieSteps < 6 * animationSpeed) {
        if (sprites.stinkies[i].stinkiesDieSteps % animationSpeed == 0) {
          sprites.stinkies[i].animations.play('die');
        }
        sprites.stinkies[i].stinkiesDieSteps++;
      } else {
        sprites.stinkies[i].kill();
        sprites.stinkies.splice(i, 1);
      }
    } else {
      sprites.stinkies[i].animations.play('infinite');
    }
  }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});