var Platforms = function(hole) {

  const ID_GREEN = 1;
  const ID_WALL = 2;

  var map;
  var layer;

  this.preload = function() {
    game.load.tilemap('map', 'game/parkours/'+Data.parkour.name+'/'+hole.layerName+'.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('green', 'game/green.png');
    game.load.image('wall', 'game/wall.png');
  }

  this.create = function(layername) {
    map = game.add.tilemap('map');
    layer = map.createLayer(layername);
    map.setCollisionBetween(1, 12);
    game.physics.enable(layer);
    map.addTilesetImage('green');
    map.addTilesetImage('wall');
  }

  this.onWallHit = function(func) {
    map.setTileIndexCallback(ID_WALL, func, this);
  }

  this.onGreenHit = function(func) {
    map.setTileIndexCallback(ID_GREEN, func, this);
  }

  this.getLayer = function() {
    return layer;
  }

}
