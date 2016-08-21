/**
 * use in the preload section
 */
var StinkyWebFontConfig = function StinkyWebFontConfig(families, callback) {
  if(!families) throw 'need font family here';
  if(typeof families != 'Array') families = [families];
  var WebFontConfig = {
      active: function() { game.time.events.add(Phaser.Timer.SECOND, createScoreBar, this); },
      google: {
        families: families
      }
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
  };
};
