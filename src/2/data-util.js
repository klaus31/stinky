var Data = {}; // TODO implement real persistence solution

Data.parkour = StinkyConfig.parkours[0]; // TODO delete: it's just for testing results
while (Data.parkour.holes.length < 19) { // FIXME delete when 18 holes implemented
  var holeCopy = JSON.parse(JSON.stringify(Data.parkour.holes[0]));
  holeCopy.level = Data.parkour.holes.length;
  Data.parkour.holes.push(holeCopy);
}

var DataUtil = {};

DataUtil.PARKOUR_LENGTH = 18; // yes, every f**ing parkour is bound to 18 holes without any need \\_(OvO)_//

DataUtil.getHole = function(level) {
  var i = DataUtil.getHolesOfParkour().length;
  while (i--) {
    if (Data.parkour.holes[i].level == level) return Data.parkour.holes[i];
  }
  throw 'no hole with level: ' + level;
}

DataUtil.getParkour = function() {
  return Data.parkour;
}

DataUtil.getHolesOfParkour = function() {
  return DataUtil.getParkour().holes;
}

DataUtil.getNextHole = function() {
  return DataUtil.getHole(DataUtil.getHolesPlayed().length + 1);
}

DataUtil.getNextLevel = function() {
  return DataUtil.getNextHole().level;
}

DataUtil.getHolesPlayed = function() {
  var holes = [];
  var level = 1;
  while (DataUtil.getHole(level).playedAlready) {
    holes.push(DataUtil.getHole(level));
    level++;
  }
  return holes;
}

DataUtil.getHandicap = function(level) {
  level = level || DataUtil.getNextLevel() - 1 || 1;
  var holesPlayed = DataUtil.getHolesPlayed();
  var holesRelevant = [];
  var i = holesPlayed.length;
  while (i--) {
    if(holesPlayed[i].level <= level){
      holesRelevant.push(holesPlayed[i]);
    }
  }

  var triesSum = 0;
  i = holesRelevant.length;
  while (i--) triesSum += holesPlayed[i].tries;

  var parSum = 0;
  i = holesRelevant.length;
  while (i--) parSum += holesPlayed[i].par;

  return triesSum - parSum;
}
