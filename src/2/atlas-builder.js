/**
 * builder for atlas data of scale 1
 */
var AtlasBuilder = function(image, w, h) {

  var meta = {
    image: image,
    size: {
      w: w,
      h: h
    },
    scale: 1,
    format: 'RGBA8888'
  };

  var frames = {};

  this.addFrame = function(name, x, y, w, h) {
    frames[name] = {
      frame: {
        x: x,
        y: y,
        w: w,
        h: h
      },
      rotated: false,
      trimmed: false,
      spriteSourceSize: {
        x: 0,
        y: 0,
        w: w,
        h: h
      },
      sourceSize: {
        w: w,
        h: h
      }
    }
  }

  this.build = function() {
    return {
      meta: meta,
      frames: frames
    }
  }
};