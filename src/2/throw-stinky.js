var Data = {}; // TODO implement real persistence solution

Data.parkour = StinkyConfig.parkours[0]; // TODO delete: it's just for testing results
while (Data.parkour.holes.length < 19) { // FIXME delete when 18 holes implemented
  var holeCopy = JSON.parse(JSON.stringify(Data.parkour.holes[0]));
  holeCopy.level = Data.parkour.holes.length;
  Data.parkour.holes.push(holeCopy);
}

var DataUtil = {};

DataUtil.getHole = function(level) {
  var i = DataUtil.getCurrentHoles().length;
  while (i--) {
    if (Data.parkour.holes[i].level == level) return Data.parkour.holes[i];
  }
  throw 'no hole with level: ' + level;
};

DataUtil.getCurrentParkour = function() {
  return Data.parkour;
};

DataUtil.getCurrentHoles = function() {
  return DataUtil.getCurrentParkour().holes;
}

DataUtil.getCurrentHole = function() {
  var holesLength = DataUtil.getCurrentHoles().length;
  var level = 1;
  while (DataUtil.getHole(level).playedAlready) {
    level++;
  }
  return DataUtil.getHole(level);
}

DataUtil.getCurrentLevel = function() {
  return DataUtil.getCurrentHole().level;
}

var game = new Phaser.Game(960, 600, Phaser.CANVAS, '');
game.state.add('MainMenu', new MainMenu());
game.state.add('Result', new Result());
game.state.start('MainMenu');
