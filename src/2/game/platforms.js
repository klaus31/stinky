var Platforms = function(hole) {

  const ID_GREEN = 1;
  const ID_FIRE = 2;

  var map;
  var layer;

  this.preload = function() {
    var basicDir = 'game/parkours/' + Data.parkour.name + '/';
    game.load.tilemap('map', basicDir + hole.layerName + '.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('green', basicDir + 'green.png');
    game.load.image('fire', basicDir + 'fire.png');
    game.load.image('bound', basicDir + 'bound.png');
  }

  this.create = function(layername) {
    map = game.add.tilemap('map');
    layer = map.createLayer(layername);
    map.setCollisionBetween(1, 12);
    game.physics.enable(layer);
    map.addTilesetImage('green');
    map.addTilesetImage('fire');
    map.addTilesetImage('bound');
  };

  this.onFireHit = function(func) {
    map.setTileIndexCallback(ID_FIRE, func, this);
  }

  this.onGreenHit = function(func) {
    map.setTileIndexCallback(ID_GREEN, func, this);
  }

  this.getLayer = function() {
    return layer;
  }

}
