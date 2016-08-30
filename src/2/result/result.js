var Result = function(parkour) {

  const EOL = '\r\n';
  const TABLE_ROW_WIDTH = 400;
  const TABLE_ROW_HEIGHT = 40;
  const TABLE_Y = 200;
  const HOLES_IN_PARKOUR = 18;
  const CELL_PADDING = 5;

  this.preload = function() {
    game.load.image('table-row', 'result/table-row.png');
    game.load.image('result-bg', 'result/result-bg.png');
  }

  var nextLevel = function() {
    var nextLevelKey = 'game-' + (DataUtil.getCurrentLevel() + 1);
    game.state.add(nextLevelKey, new StinkySystem());
    game.state.start(nextLevelKey);
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
    var createRow = function(x, y, cols, textstyle) {
      game.add.text(x, y, cols[0], textstyle);
      game.add.text(x + 180, y, cols[1], textstyle);
      game.add.text(x + 255, y, cols[2], textstyle);
      game.add.text(x + 325, y, cols[3], textstyle);
    }
    var createTableContents = function() {
      var textstyle = {
        fontSize: '16px',
        fill: '#000',
        font: 'Courier'
      };

      var level = 0;
      var total = 0;
      while (level++ < HOLES_IN_PARKOUR) {
        var i = level - 1;
        var hole = DataUtil.getHole(level);
        var y = rowPositions[i].y + CELL_PADDING;
        var name = level + '. ' + hole.name;
        var par = hole.par;
        var tries = '';
        if(hole.playedAlready) {
          tries = hole.tries - 0;
          total += tries - 0;
        }
        var headlines = [name, par, tries, total];
        createRow(rowPositions[i].x + CELL_PADDING, y, headlines, textstyle);
      };
    }
    var createHeadlines = function() {
      var textstyle = {
        fontSize: '16px',
        fill: '#000',
        font: 'Courier',
        fontWeight: 'bold'
      };
      var y = rowPositions[0].y - CELL_PADDING - 16;
      var headlines = ['Hole', 'Par', 'Tries', 'Total'];
      createRow(rowPositions[0].x + CELL_PADDING, y, headlines, textstyle);
      createRow(rowPositions[9].x + CELL_PADDING, y, headlines, textstyle);
    }
    var createTable = function() {
      var i = rowPositions.length;
      while (i--) {
        game.add.sprite(rowPositions[i].x, rowPositions[i].y, 'table-row');
      }
    }
    game.add.sprite(0, 0, 'result-bg');
    createTable();
    createHeadlines();
    createTableContents();
  }

  this.update = function() {}
}
