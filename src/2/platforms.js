var Platforms = function() {

  var map;

  this.preload = function() {
    game.load.tilemap('map', 'platforms.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('platform', 'platform.png');
  }

  this.create = function() {
    map = game.add.tilemap('map');
    map.addTilesetImage('platform');
    var layer = map.createLayer('layer-1');
     map.setCollisionBetween(1, 2560);
     game.physics.p2.convertTilemap(map, layer);
  }
}
