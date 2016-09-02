var Data = {}; // TODO implement real persistence solution

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

DataUtil.isParkourFinished = function() {
  return DataUtil.getHolesPlayed().length == DataUtil.PARKOUR_LENGTH;
}

DataUtil.getNextHole = function() {
  var holesPlayed = DataUtil.getHolesPlayed().length;
  if (holesPlayed == DataUtil.PARKOUR_LENGTH) return null;
  else return DataUtil.getHole(holesPlayed + 1);
}

DataUtil.getLastHolePlayed = function() {
  return DataUtil.getHole(DataUtil.getHolesPlayed().length);
}

DataUtil.getNextLevel = function() {
  return DataUtil.getNextHole().level;
}

DataUtil.getHolesPlayed = function() {
  var holes = [];
  var level = 1;
  while (level <= DataUtil.PARKOUR_LENGTH && DataUtil.getHole(level).playedAlready) {
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
    if (holesPlayed[i].level <= level) {
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