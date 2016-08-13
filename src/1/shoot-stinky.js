var StinkyScreen = function() {
  var width = window.innerWidth || document.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth;
  var height = window.innerHeight || document.documentElement.clientHeight || d.getElementsByTagName('body')[0].clientHeight;
  this.getWidth = function getWidth() {
    return width;
  }
  this.getHeight = function getHeight() {
    return height;
  }
}

var WebFontConfig = {
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createScoreBar, this); },
    google: {
      families: ['Indie Flower']
    }
};

var createScoreBar = function() {
  scoreText = game.add.text(game.world.width - 200, game.world.height - 35, calculateScoreText(), textstyle);
};

var stinkyScreen = new StinkyScreen();

var sprites = {
  stinkies: []
};

var textstyle = {
  fontSize: '24px',
  fill: '#FFF',
  font: 'Indie Flower'
};

var keys = {
  stinky: 'stinky',
  background: 'background',
  buttonGo: 'buttonGo',
  buttonFinish: 'buttonFinish'
};

var sounds = {
  stinkyCreated : {
    key: 'wind',
    file: 'wind-back-draught.mp3'
  },
  stinkyMissed : {
    key: 'fartSilent',
    file: 'fart-silent.mp3'
  },
  stinkyShot : {
    key: 'fartShot',
    file: 'fart-very-hard.mp3'
  }
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
  game.load.image('mud-pattern', 'mud-pattern.png');
  game.load.image('clouds', 'clouds.png');
  game.load.spritesheet(keys.buttonGo, 'throw.png', 200, 20);
  game.load.spritesheet(keys.buttonFinish, 'view-result.png', 200, 20);
  game.load.spritesheet(keys.stinky, 'stinky.png', 30, 30);
  game.load.audio(sounds.stinkyCreated.key, sounds.stinkyCreated.file);
  game.load.audio(sounds.stinkyMissed.key, sounds.stinkyMissed.file);
  game.load.audio(sounds.stinkyShot.key, sounds.stinkyShot.file);
  game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
};

var click = function(pointer) {
  if (pointer.position.x > 200 || pointer.position.y < game.world.height - 20) {
    countShotOnStinky++;
    var i = sprites.stinkies.length;
    while (i--) {
      var bodies = game.physics.p2.hitTest(pointer.position, [sprites.stinkies[i].body]);
      if (bodies.length) {
        sprites.stinkies[i].shot = true;
        ++countShotHitsStinky;
      } else {
        sounds.stinkyMissed.audio.play();
      }
    }
  }
  scoreText.text = calculateScoreText();
}

var create = function() {

  var createSystem = function() {
    var createSounds = function() {
      sounds.stinkyShot.audio = game.add.audio(sounds.stinkyShot.key);
      sounds.stinkyMissed.audio = game.add.audio(sounds.stinkyMissed.key);
      sounds.stinkyCreated.audio = game.add.audio(sounds.stinkyCreated.key);
    }
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.stage.backgroundColor = "#AAFFFF";
    game.add.tileSprite(0, game.world.height - 60, game.world.width,60, 'mud-pattern');
    game.add.tileSprite(0, 0, game.world.width,60, 'clouds');
    game.input.onDown.add(click, this);
    game.physics.p2.gravity.y = 100;
    createSounds();
  };

  var createStinky = function() {
    sounds.stinkyCreated.audio.play();
    var posX = 20;
    var posY = getRandomInt(100, game.world.height - 100);
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
  var result = '\r\n\r\nNo stinky left! \r\n';
  result += 'You shoot ' + countShotOnStinky + ' times on Stinkies!\r\n';
  result += 'You hit ' + countShotHitsStinky + ' of ' + stinkiesAvailable + ' Stinkies!\r\n';
  result += '-----------------------------------------------\r\n';
  result += 'TOTAL: ' + Math.floor(calculateTotalFinalPoints()) + ' %';
  return result;
};

var animationSpeed = 5;
var buttonFinish;
var update = function() {
  var i = sprites.stinkies.length;
  if(countStinkiesLeft() == 0) {
    var actionOnClick = function() {
      ++countStinkiesCreated; // hack - to get -1
    }
    var posX = 0;
    var posY = game.world.height - 20;
    buttonGo.kill();
    buttonFinish = game.add.button(posX, posY, keys.buttonFinish, actionOnClick, this, 2, 1, 0);
    game.physics.p2.enable(buttonFinish, false);
  }
  if (countStinkiesLeft() <= -1) {
    buttonFinish.kill();
    while (i--) {
      sprites.stinkies[i].kill();
    }
    scoreText.kill();
    textstyle.fill = '#000';
    game.add.text(16, 16, createResultText(), textstyle);
    game.input.onDown.removeAll();
  } else {
    while (i--) {
      var stinky = sprites.stinkies[i];
      if (stinky.shot) {
        stinky.stinkiesDieSteps = stinky.stinkiesDieSteps || 0;
        if(stinky.stinkiesDieSteps === 0) {
          sounds.stinkyShot.audio.play();
        }
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

var game = new Phaser.Game(stinkyScreen.getWidth(), stinkyScreen.getHeight(), Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});
