var Platforms = function() {

  var map;
  var layer;

  this.preload = function() {
    game.load.tilemap('map', 'platforms.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('platform', 'platform.png');
  }

  this.create = function() {
    map = game.add.tilemap('map');
    layer = map.createLayer('layer-1');
    map.setCollisionBetween(1, 12);
    game.physics.enable(layer);
    map.addTilesetImage('platform');
  }

  this.getLayer = function() {
    return layer;
  }

}
