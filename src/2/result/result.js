var Result = function(parkour) {

  const EOL = '\r\n';
  const TABLE_ROW_WIDTH = 400;
  const TABLE_ROW_HEIGHT = 40;
  const TABLE_Y = 200;
  const CELL_PADDING = 10;

  var backgroundImageName = 'toilet-paper-bg';
  var backgroundImageFile = 'result/' + backgroundImageName + '.png';
  var background;
  var backgroundColor = '#FF77DD';

  this.preload = function() {
    game.load.image(backgroundImageName, backgroundImageFile, 99, 55);
    game.load.image('table-row', 'result/table-row.png');

    var width = 597;
    var atlasBuilder = new AtlasBuilder('results', width, 1046);
    atlasBuilder.addFrame('hole-in-one', 0, 0, width, 90);
    atlasBuilder.addFrame('super-albatross', 0, 940, width, 105);
    atlasBuilder.addFrame('albatross', 0, 92, width, 105);
    atlasBuilder.addFrame('eagle', 0, 197, width, 103);
    atlasBuilder.addFrame('birdie', 0, 300, width, 94);
    atlasBuilder.addFrame('par', 0, 386, width, 114);
    atlasBuilder.addFrame('bogey', 0, 488, width, 102);
    atlasBuilder.addFrame('double-bogey', 0, 602, width, 114);
    atlasBuilder.addFrame('triple-bogey', 0, 718, width, 114);
    atlasBuilder.addFrame('shitty', 0, 835, width, 90);
    game.load.atlas('results', 'result/results.png', null, atlasBuilder.build());

    var atlasBuilder = new AtlasBuilder('next-buttons', 70, 214);
    atlasBuilder.addFrame('normal', 0, 0, 70, 70);
    atlasBuilder.addFrame('hover', 0, 73, 70, 70);
    atlasBuilder.addFrame('down', 0, 214 - 70, 70, 70);
    game.load.atlas('next-buttons', 'result/next-buttons.png', null, atlasBuilder.build());
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
      game.add.text(x + 350, y, cols[4], textstyle);
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
          handicapTotalText = handicapTotal > 0 ? '+' + handicapTotal : handicapTotal;
          handicapHoleText = handicapHole > 0 ? '+' + handicapHole : handicapHole;
        }
        var headlines = [name, par, tries, handicapHoleText, handicapTotalText];
        createRow(rowPositions[i].x + CELL_PADDING, y, headlines, textstyle);
      };
    }

    var createTableHeadlines = function() {
      var textstyle = {
        fontSize: '16px',
        fill: '#000',
        font: 'Courier',
        fontWeight: 'bold'
      };
      var y = rowPositions[0].y - CELL_PADDING - 16;
      var headlines = ['Hole', 'Par', 'Strox', 'Hole', 'HCP'];
      createRow(rowPositions[0].x + CELL_PADDING, y, headlines, textstyle);
      createRow(rowPositions[9].x + CELL_PADDING, y, headlines, textstyle);
    }

    var createTable = function() {
      var i = rowPositions.length;
      while (i--) {
        game.add.sprite(rowPositions[i].x, rowPositions[i].y, 'table-row');
      }
    }

    var createResultHeadline = function() {
      var resultNames = game.add.sprite((game.world.width - 597) / 2, 40, 'results');
      var hole = DataUtil.getLastHolePlayed();
      var handicap = hole.tries - hole.par;
      if (hole.tries == 1) {
        resultNames.frameName = 'hole-in-one';
      } else if (handicap < -3) {
        resultNames.frameName = 'super-albatross';
      } else if (handicap == -3) {
        resultNames.frameName = 'albatross';
      } else if (handicap == -2) {
        resultNames.frameName = 'eagle';
      } else if (handicap == -1) {
        resultNames.frameName = 'birdie';
      } else if (handicap == 0) {
        resultNames.frameName = 'par';
      } else if (handicap == 1) {
        resultNames.frameName = 'bogey';
      } else if (handicap == 2) {
        resultNames.frameName = 'double-bogey';
      } else if (handicap == 3) {
        resultNames.frameName = 'triple-bogey';
      } else {
        resultNames.frameName = 'shitty';
      }
    }

    game.stage.backgroundColor = backgroundColor;
    background = game.add.tileSprite(0, 0, game.world.width, game.world.height, backgroundImageName);
    createTable();
    createTableHeadlines();
    createTableContents();
    createResultHeadline();

    if(DataUtil.isParkourFinished()) {
      // TODO start a firework
    } else {
      game.add.button(game.world.width - 120, 80, 'next-buttons', nextLevel, game, 'hover', 'normal', 'down');
    }
  }

  this.update = function() {
    background.tilePosition.x -= 2;
    background.tilePosition.y -= 1;
  }
}
