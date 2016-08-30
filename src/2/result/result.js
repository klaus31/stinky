var Result = function() {

  const EOL = '\r\n';
  const TABLE_ROW_WIDTH = 400;
  const TABLE_ROW_HEIGHT = 40;
  const TABLE_Y = 200;
  const HOLES_IN_PARKOUR = 18;

  this.preload = function() {
    game.load.image('table-row', 'result/table-row.png');
    game.load.image('result-bg', 'result/result-bg.png');
  }

  var getPosOfRows = function() {
    var i = 0;
    var xFirstCol = (game.world.width - 2 * TABLE_ROW_WIDTH) / 3;
    var xSecondCol = xFirstCol + TABLE_ROW_WIDTH + xFirstCol;
    var positions = [];
    do {
      positions.push({
        x: i < 9 ? xFirstCol : xSecondCol,
        y: TABLE_Y + TABLE_ROW_HEIGHT * (i % 9)
      });
    } while (i++ < HOLES_IN_PARKOUR);
    return positions;
  }

  this.create = function() {
    var rowPositions = getPosOfRows();
    var createTable = function() {
      var i = rowPositions.length;
      while (i--) {
        game.add.sprite(rowPositions[i].x, rowPositions[i].y, 'table-row');
      }
    }
    game.add.sprite(0, 0, 'result-bg');
    createTable();
  }

  this.update = function() {}
}