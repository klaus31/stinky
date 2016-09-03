var Board = function() {

  var me = this;
  var text;
  var currentPar;
  var sprite;

  const width = 250;
  const height = 40;
  const name = 'board';
  const file = 'game/' + name + '.png';

  this.preload = function() {
    game.load.image(name, file, width, height);
  }

  this.create = function(par) {
    currentPar = par;
    var posX = 0;
    var posY = 0;
    sprite = game.add.sprite(posX, posY, name);
    var textstyle = {
      fontSize: '12px',
      fill: '#000',
      font: 'Courier'
    };
    text = game.add.text(posX + 20, 2, 0, textstyle);
    me.updateScore(0);
  }

  this.updateScore = function(tries) {
    text.text = 'Par: ' + currentPar + '   ' + 'Strokes: ' + tries;
  }

};