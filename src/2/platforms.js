var Platforms = function() {

  const ID_PLATFORM = 1;
  const ID_WALL = 2;

  var map;
  var layer;

  this.preload = function() {
    game.load.tilemap('map', 'platforms.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('platform', 'platform.png');
    game.load.image('wall', 'wall.png');
  }

  this.create = function() {
    map = game.add.tilemap('map');
    layer = map.createLayer('layer-1');
    map.setCollisionBetween(1, 12);
    game.physics.enable(layer);
    map.addTilesetImage('platform');
    map.addTilesetImage('wall');
  }

  this.onWallHit = function(func) {
    map.setTileIndexCallback(ID_WALL, func, this);
  }

  this.getLayer = function() {
    return layer;
  }

}