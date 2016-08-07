var cursors;
var ground;
var platforms;
var player;
var killerThings;

const KEY_BACKGROUND = 'ground';
const KEY_MUD = 'mud';
const KEY_FIRE = 'fire';
const KEY_SMILEY = 'smiley';
const KEY_WEAPON = 'weapon';
const KEY_CROSS = 'cross';

var preload = function() {
  game.load.image(KEY_BACKGROUND, 'assets/bg.png');
  game.load.image(KEY_CROSS, 'assets/cross.png');
  game.load.image(KEY_MUD, 'assets/mud.png');
  game.load.image(KEY_WEAPON, 'assets/weapon.png');
  game.load.image(KEY_FIRE, 'assets/fire.png');
  game.load.spritesheet(KEY_SMILEY, 'assets/smiley.png', 32, 48);
  cursors = game.input.keyboard.createCursorKeys();
}

var create = function() {

  var createSystem = function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, KEY_BACKGROUND);
    platforms = game.add.group();
    platforms.enableBody = true;
    killerThings = game.add.group();
    killerThings.enableBody = true;
  }

  var createGround = function() {
    var ground = platforms.create(0, game.world.height - 60, KEY_FIRE);
    ground.body.immovable = true;
    killerThings.add(ground);
  }

  var createCrosses = function() {
    var cross = platforms.create(90, 180, KEY_CROSS);
    cross.body.immovable = true;
    killerThings.add(cross);
    cross = platforms.create(600, 380, KEY_CROSS);
    cross.body.immovable = true;
    killerThings.add(cross);
  }

  var createLedges = function() {
    var ledge = platforms.create(500, 400, KEY_MUD);
    ledge.body.immovable = true;
    ledge = platforms.create(-450, 200, KEY_MUD);
    ledge.body.immovable = true;
  }

  var createPlayer = function() {
    player = game.add.sprite(0, 0, KEY_SMILEY);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.5;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
  }

  var createWeapons = function() {
    weapons = game.add.group();
    weapons.enableBody = true;
    var weapon = weapons.create(450, 150, KEY_WEAPON);
    weapon.body.gravity.y = 0;
    weapon.body.bounce.y = 0.7 + Math.random() * 0.2;
  }

  createSystem();
  createGround();
  createLedges();
  createWeapons();
  createCrosses();
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

  var updateCollectedThings = function() {
    game.physics.arcade.overlap(player, weapons, function(player, weapon) {
      weapon.kill();
    }, null, this);
  }

  var updatePlayerKilled = function() {
    game.physics.arcade.overlap(player, killerThings, function(player) {
      player.kill();
    }, null, this);
  }

  updateOnCollision();
  updatePlayerOnKeyAction();
  updateCollectedThings();
  updatePlayerKilled();
}

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});