var Starter = {
  name: 'beginner',
  holes: [{
    layerName: 'c',
    name: 'four trees',
    bgimage: true,
    level: 16,
    stinky: {
      options: {
        bounce: 1,
        position: {
          x: 138,
          y: 400
        },
        gravity: 250
      }
    },
    par: 5
  }, {
    layerName: 'a',
    name: 'green floor',
    bgcolor: '#004',
    level: 1,
    stinky: {
      options: {
        bounce: 1,
        position: {
          x: 20,
          y: 560
        },
        gravity: 200
      }
    },
    par: 2
  }, {
    layerName: 'b',
    name: 'ping pong',
    level: 5,
    stinky: {
      options: {
        bounce: 1,
        position: {
          x: 20,
          y: 560
        },
        gravity: 0
      }
    },
    par: 2
  }, {
    layerName: 'd',
    name: 'snake',
    level: 2,
    stinky: {
      options: {
        bounce: 1,
        position: {
          x: 50,
          y: 560
        },
        gravity: 200
      }
    },
    par: 2
  }, {
    layerName: 'e',
    name: 'labyrinth',
    level: 17,
    stinky: {
      options: {
        bounce: 0.4,
        position: {
          x: 90,
          y: 395
        },
        gravity: 200
      }
    },
    par: 15
  }, {
    layerName: 'f',
    name: 'space',
    level: 6,
    bgimage: true,
    stinky: {
      options: {
        bounce: 1,
        position: {
          x: 20,
          y: 560
        },
        gravity: 0
      }
    },
    par: 5
  }, {
    layerName: 'g',
    name: 'frogger',
    bgimage: true,
    level: 4,
    stinky: {
      options: {
        bounce: 1,
        position: {
          x: 20,
          y: 560
        },
        gravity: 200
      }
    },
    par: 5
  }, {
    layerName: 'h',
    name: 'deerstand',
    level: 7,
    bgcolor: '#002211',
    stinky: {
      options: {
        bounce: 2,
        position: {
          x: 850,
          y: 50
        },
        gravity: 500
      }
    },
    par: 3
  }, {
    layerName: 'i',
    name: 'learn to fly',
    bgcolor: '#00A',
    level: 12,
    stinky: {
      options: {
        bounce: 1,
        position: {
          x: 850,
          y: 200
        },
        gravity: 200
      }
    },
    par: 15
  }, {
    layerName: 'j',
    name: 'over mountain',
    bgcolor: '#A0A',
    level: 14,
    stinky: {
      options: {
        bounce: 1,
        position: {
          x: 20,
          y: 560
        },
        gravity: 200
      }
    },
    par: 12
  }, {
    layerName: 'k',
    name: 'beer',
    bgcolor: '#033',
    level: 11,
    stinky: {
      options: {
        bounce: 0,
        position: {
          x: 20,
          y: 560
        },
        gravity: 300
      }
    },
    par: 5
  }, {
    layerName: 'l',
    name: 'over boxes',
    level: 8,
    bgcolor: '#0A0',
    stinky: {
      options: {
        bounce: 0.5,
        position: {
          x: 20,
          y: 560
        },
        gravity: 800
      }
    },
    par: 4
  }, {
    layerName: 'm',
    name: 'spider shit 2',
    level: 15,
    bgcolor: '#330',
    stinky: {
      options: {
        bounce: 0.5,
        position: {
          x: 30,
          y: 540
        },
        gravity: 400
      }
    },
    par: 3
  }, {
    layerName: 'n',
    name: 'spider shit 1',
    level: 3,
    bgimage: true,
    stinky: {
      options: {
        bounce: 0,
        position: {
          x: 30,
          y: 560
        },
        gravity: 400
      }
    },
    par: 3
  }, {
    layerName: 'o',
    name: 'storm',
    level: 10,
    bgimage: true,
    stinky: {
      options: {
        bounce: 1,
        position: {
          x: 20,
          y: 560
        },
        gravity: 200
      }
    },
    par: 5
  }, {
    layerName: 'p',
    name: 'confetti',
    level: 13,
    stinky: {
      options: {
        bounce: 1,
        position: {
          x: 20,
          y: 560
        },
        gravity: 999
      }
    },
    par: 5
  }, {
    layerName: 'q',
    name: 'trouble',
    bgcolor: '#505',
    level: 9,
    stinky: {
      options: {
        bounce: 0.4,
        position: {
          x: 750,
          y: 560
        },
        gravity: 200
      }
    },
    par: 7
  }, {
    layerName: 'r',
    name: 'mole shit',
    level: 18,
    bgcolor: '#000',
    stinky: {
      options: {
        bounce: 0.8,
        position: {
          x: 60,
          y: 395
        },
        gravity: 50
      }
    },
    par: 10
  }]
};
Data.parkours.push(Starter);
