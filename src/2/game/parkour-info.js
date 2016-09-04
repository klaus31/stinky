var ParkourInfo = function() {

  var me = this;
  var thingsToToggle = [];
  var onClose = false;

  const BG_WIDTH = 600;
  const BG_HEIGHT = 450;

  this.onClose = function(func) {
    onClose = func;
  }

  this.preload = function() {
    game.load.image('bg', 'game/parkour-info-bg.png', BG_WIDTH, BG_HEIGHT);

    var atlasBuilder = new AtlasBuilder('ok-buttons', 300, 50);
    atlasBuilder.addFrame('normal', 0, 0, 100, 50);
    atlasBuilder.addFrame('hover', 100, 0, 100, 50);
    atlasBuilder.addFrame('down', 200, 0, 100, 50);
    game.load.atlas('ok-buttons', 'game/ok-button.png', null, atlasBuilder.build());

    atlasBuilder = new AtlasBuilder('window-close-button', 50, 50);
    atlasBuilder.addFrame('down', 0, 0, 50, 50);
    atlasBuilder.addFrame('normal', 50, 0, 50, 50);
    atlasBuilder.addFrame('hover', 100, 0, 50, 50);
    game.load.atlas('window-close-button', 'game/window-close-button.png', null, atlasBuilder.build());
  }

  this.create = function(hole) {

    var allTextX = game.world.width / 2 - BG_WIDTH / 2 + 80;
    var lineYPointer = game.world.height / 2 - BG_HEIGHT / 2 + 50;

    var createBackground = function() {
      var x = game.world.width / 2 - BG_WIDTH / 2;
      var y = game.world.height / 2 - BG_HEIGHT / 2;
      thingsToToggle.push(game.add.sprite(x, y, 'bg'));
    }

    var createHeadlineMain = function() {
      var style = {
        fontSize: '36px',
        fill: '#000',
        font: 'Courier',
        fontWeight: 'bold'
      };
      var y = game.world.height / 2 - BG_HEIGHT / 2 + 20;
      var text = DataUtil.getParkour().name;
      thingsToToggle.push(game.add.text(allTextX, lineYPointer, text, style));
    }

    var createHeadlineSub = function() {
      var style = {
        fontSize: '24px',
        fill: '#000',
        font: 'Courier',
        fontWeight: 'bold'
      };
      var text = 'Hole ' + hole.level + ': ' + hole.name;
      thingsToToggle.push(game.add.text(allTextX, lineYPointer += 45, text, style));
    }

    var createText = function() {
      var style = {
        fontSize: '20px',
        fill: '#000',
        font: 'Courier',
        tabs: [190]
      };

      var createListToShow = function() {
        var rows = [];
        rows.push(['Par', hole.par]);
        rows.push(['Gravity', hole.stinky.options.gravity]);
        var energy = Math.floor(hole.stinky.options.bounce * 100);
        rows.push(['Bounce Energy', energy == 0 ? 'none' : energy + ' %']);
        return rows;
      }

      var text = game.add.text(allTextX, lineYPointer += 40, '', style);
      text.parseList(createListToShow());
      thingsToToggle.push(text);
    }

    var createOkButton = function() {
      var x = game.world.width / 2 + BG_WIDTH / 2 - 150;
      var y = game.world.height / 2 + BG_HEIGHT / 2 - 100;
      var button = game.add.button(x, y, 'ok-buttons', closeInfo, game, 'hover', 'normal', 'down');
      thingsToToggle.push(button);
    }

    var createWindowCloseButton = function() {
      var x = game.world.width / 2 + BG_WIDTH / 2 - 25;
      var y = game.world.height / 2 - BG_HEIGHT / 2 - 25;
      var button = game.add.button(x, y, 'window-close-button', closeInfo, game, 'hover', 'normal', 'down');
      thingsToToggle.push(button);
    }

    createBackground();
    createHeadlineMain();
    createHeadlineSub();
    createText();
    createOkButton();
    createWindowCloseButton();
  }

  var closeInfo = function() {
    var i = thingsToToggle.length;
    while (i--) thingsToToggle[i].alpha = 0;
    onClose();
  }
};