var Result = function(parkour) {

  const EOL = '\r\n';
  const TABLE_ROW_WIDTH = 400;
  const TABLE_ROW_HEIGHT = 40;
  const TABLE_Y = 200;
  const CELL_PADDING = 10;

  this.preload = function() {
    game.load.image('table-row', 'result/table-row.png');
    game.load.image('result-bg', 'result/result-bg.png');
    // TODO check game.load.atlas for button
    game.load.image('next-button', 'result/next-button.png');
  }

  var nextLevel = function() {
    var nextLevelKey = 'game-' + DataUtil.getNextLevel();
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
    } while (++i < DataUtil.PARKOUR_LENGTH);
    return positions;
  }

  this.create = function() {
    var rowPositions = getPosOfRows();
    var createRow = function(x, y, cols, textstyle) {
      game.add.text(x, y, cols[0], textstyle);
      game.add.text(x + 185, y, cols[1], textstyle);
      game.add.text(x + 238, y, cols[2], textstyle);
      game.add.text(x + 301, y, cols[3], textstyle);
      game.add.text(x + 359, y, cols[4], textstyle);
    }
    var createTableContents = function() {
      var textstyle = {
        fontSize: '16px',
        fill: '#000',
        font: 'Courier'
      };

      var level = 0;
      while (level++ < DataUtil.PARKOUR_LENGTH) {
        var handicapTotalText = '';
        var handicapHoleText = '';
        var i = level - 1;
        var hole = DataUtil.getHole(level);
        var y = rowPositions[i].y + CELL_PADDING;
        var name = level + '. ' + hole.name;
        var par = hole.par;
        var tries = '';
        if (hole.playedAlready) {
          tries = hole.tries - 0;
          var handicapTotal = DataUtil.getHandicap(hole.level);
          var handicapHole = hole.tries - hole.par;
          handicapTotalText = handicapTotal> 0 ? '+' + handicapTotal : handicapTotal;
          handicapHoleText = handicapHole> 0 ? '+' + handicapHole : handicapHole;
        }
        var headlines = [name, par, tries, handicapHoleText, handicapTotalText];
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
      var headlines = ['Hole', 'Par', 'Tries', 'HC', 'HCT']; // FIXME HC für Handicap und HCT für Handicap Total rafft niemand
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
    // TODO when game.load.atlas check:
    // game.add.button(400, 600, 'start-button', startGame, game, 'buttonOver', 'buttonOut', 'buttonOver');
    game.add.button(0, 0, 'next-button', nextLevel, game);
    createTable();
    createHeadlines();
    createTableContents();
  }

  this.update = function() {}
}
