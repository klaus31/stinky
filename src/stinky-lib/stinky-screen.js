var StinkyScreen = function StinkyScreen() {
  var width = window.innerWidth || document.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth;
  var height = window.innerHeight || document.documentElement.clientHeight || d.getElementsByTagName('body')[0].clientHeight;
  this.getWidth = function getWidth() {
    return width;
  }
  this.getHeight = function getHeight() {
    return height;
  }
}
