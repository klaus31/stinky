var platforms;
var player;
var cursors;

const BACKGROUND = 'ground';
const SMILEY = 'smiley';
const MUD = 'mud';

var preload = function() {
  game.load.image(BACKGROUND, 'assets/bg.png');
  game.load.image(MUD, 'assets/mud.png');
  game.load.spritesheet(SMILEY, 'assets/smiley.png', 32, 48);
  cursors = game.input.keyboard.createCursorKeys();
}

var create = function() {

  var createSystem = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, BACKGROUND);
    platforms = game.add.group();
    platforms.enableBody = true;
  }

  var createGround = function() {
    var ground = platforms.create(0, game.world.height - 60, MUD);
    ground.body.immovable = true;
  }

  var createLedges = function() {
    var ledge = platforms.create(500, 400, MUD);
    ledge.body.immovable = true;
    ledge = platforms.create(-450, 200, MUD);
    ledge.body.immovable = true;
  }

  var createPlayer = function() {
    player = game.add.sprite(0, 0, SMILEY);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.5;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  createSystem();
  createGround();
  createLedges();
  createPlayer();
}


var update = function() {

  var updateOnCollision = function() {
    game.physics.arcade.collide(player, platforms);
  }

  var updatePlayerOnKeyAction = function() {
    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
      player.body.velocity.x = -100;
      player.animations.play('left');
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 100;
      player.animations.play('right');
    } else {
      player.animations.stop();
      player.frame = 4;
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -150;
    }
  }

  updateOnCollision();
  updatePlayerOnKeyAction();
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});
