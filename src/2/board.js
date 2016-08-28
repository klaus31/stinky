var Board = function() {

  var me = this;
  var countThrown;
  var countHit;
  var currentPar;

  const width = 250;
  const height = 40;
  const name = 'board';
  const file = name + '.png';

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
    countThrown = game.add.text(game.world.width / 2, 4, 0, textstyle);
    countHit = game.add.text(game.world.width / 2 + 50, 4, 0, textstyle);
  }

  this.updateScore = function(thrown, hits) {
    countThrown.text = thrown + '/' + currentPar;
    countHit.text = hits;
  }

};