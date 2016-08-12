var sprites = {
  stinkies: []
};

var textstyle = {
  fontSize: '16px',
  fill: '#000'
};

var keys = {
  stinky: 'stinky',
  background: 'background',
  buttonGo: 'buttonGo'
};

var stinkiesAvailable = 10;
var mouseBody;
var countShotHitsStinky = 0;
var countShotOnStinky = 0;
var countStinkiesCreated = 0;
var scoreText;
var buttonGo;

var countStinkiesLeft = function() {
  return stinkiesAvailable - countStinkiesCreated;
}

var getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

var calculateScoreText = function() {
  var result = '📍 ' + countShotOnStinky + '   ';
  result += '💩 ' + countStinkiesLeft() + '   ';
  result += '🚮 ' + countShotHitsStinky;
  return result;
}

var preload = function() {
  game.load.image(keys.background, 'assets/bg.png');
  game.load.spritesheet(keys.buttonGo, 'assets/go.png', 200, 30);
  game.load.spritesheet(keys.stinky, 'assets/stinky.png', 30, 30);
};

var click = function(pointer) {
  var hit = false;
  if (pointer.position.x > 200 || pointer.position.y < game.world.height - 20) {
    countShotOnStinky++;
    var i = sprites.stinkies.length;
    while (i--) {
      var bodies = game.physics.p2.hitTest(pointer.position, [sprites.stinkies[i].body]);
      if (bodies.length) {
        sprites.stinkies[i].shot = true;
        ++countShotHitsStinky;
        hit = true;
      }
    }
  }
  scoreText.text = calculateScoreText();
}

var release = function(pointer) {}

var move = function(pointer, x, y, isDown) {}

var create = function() {

  var createSystem = function() {
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.add.sprite(0, 0, keys.background);
    game.input.onDown.add(click, this);
    game.input.onUp.add(release, this);
    game.input.addMoveCallback(move, this);
    scoreText = game.add.text(16, 16, calculateScoreText(), textstyle);
    game.physics.p2.gravity.y = 100;
  };

  var createStinky = function() {
    var posX = 20;
    var posY = getRandomInt(100, 500);
    var stinky = game.add.sprite(posX, posY, keys.stinky);
    game.physics.p2.enable(stinky, false);
    stinky.body.collideWorldBounds = false;
    stinky.body.velocity.x = getRandomInt(100, 400);
    stinky.body.velocity.y = getRandomInt(0, -300);
    stinky.animations.add('infinite', [0, 1, 2, 1], 10, true);
    stinky.animations.add('die', [3, 4, 5, 6, 7, 8, 9], 10, true);
    sprites.stinkies.push(stinky);
  };

  var createGoButton = function(actionOnClick) {
    var posX = 0;
    var posY = game.world.height - 20;
    var actionOnClickWrap = function() {
      ++countStinkiesCreated;
      actionOnClick();
      scoreText.text = calculateScoreText();
    }
    buttonGo = game.add.button(posX, posY, keys.buttonGo, actionOnClickWrap, this, 2, 1, 0);
    game.physics.p2.enable(buttonGo, false);
  };

  createSystem();
  createGoButton(createStinky);
};

var calculateTotalFinalPoints = function() {
  var rateHit = countShotHitsStinky / stinkiesAvailable * 65;
  var rateShotsNeeded = (countShotOnStinky ? countShotHitsStinky / countShotOnStinky : 0) * 35;
  return rateHit + rateShotsNeeded;
};

var createResultText = function() {
  var result = 'No stinky left! \r\n';
  result += 'You shoot ' + countShotOnStinky + ' times on Stinkies!\r\n';
  result += 'You hit ' + countShotHitsStinky + ' of ' + stinkiesAvailable + ' Stinkies!\r\n';
  result += '-----------------------------------------------\r\n';
  result += 'TOTAL: ' + Math.floor(calculateTotalFinalPoints()) + ' %';
  return result;
};

var animationSpeed = 5;

var update = function() {
  var i = sprites.stinkies.length;
  if (countStinkiesLeft() <= -1) {
    game.physics.p2.destroy(buttonGo);
    delete buttonGo;
    game.add.sprite(0, 0, keys.background);
    game.add.text(16, 16, calculateScoreText(), textstyle).text = createResultText();
  } else {
    while (i--) {
      var stinky = sprites.stinkies[i];
      if (stinky.shot) {
        stinky.stinkiesDieSteps = stinky.stinkiesDieSteps || 0;
        if (stinky.stinkiesDieSteps < 6 * animationSpeed) {
          if (stinky.stinkiesDieSteps % animationSpeed == 0) {
            stinky.animations.play('die');
          }
          stinky.stinkiesDieSteps++;
        } else {
          stinky.kill();
          sprites.stinkies.splice(i, 1);
        }
      } else {
        stinky.animations.play('infinite');
      }
    }
  }
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});