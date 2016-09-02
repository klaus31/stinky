var Board = function() {

  var me = this;
  var text;
  var currentPar;

  const width = 250;
  const height = 40;
  const name = 'board';
  const file = 'game/' + name + '.png';

  this.preload = function() {
    game.load.image(name, file, width, height);
  }

  this.create = function(par) {
    currentPar = par;
    var posX = game.world.width / 2 - (width / 2);
    var posY = 0;
    image = game.add.sprite(posX, posY, name);
    var textstyle = {
      fontSize: '16px',
      fill: '#000',
      font: 'Courier'
    };
    text = game.add.text(posX + 50, 10, 0, textstyle);
    me.updateScore(0);
  }

  this.updateScore = function(tries) {
    text.text = 'Par: ' + currentPar + '   ' + 'Tries: ' + tries;
  }

};