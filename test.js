const torrentcast = require('./index');
const MAGNET = '>>> magnet goes here <<<';

const wait = function(ms, callback) {
  setTimeout(callback, ms);
};

const seconds = (ms) => {
  return ms * 1000;
};

var startedPlaying = false;

torrentcast(MAGNET).on('status', (status, ctrl) => {
  console.log({status});

  if (status === 'playing' && !startedPlaying) {
    startedPlaying = true;

    wait(seconds(5), () => {
      ctrl.pause(() => {
        console.log('paused...');
      });
    });

    wait(seconds(10), () => {
      ctrl.resume(() => {
        console.log('unpaused...');
      });
    });

    wait(seconds(15), () => {
      ctrl.mute(() => {
        console.log('muted...');
      });
    });

    wait(seconds(20), () => {
      ctrl.unmute(() => {
        console.log('unmuted...');
      });
    });

    wait(seconds(25), () => {
      ctrl.stop(() => {
        console.log('stopped...');
      });
    });
  }
});

/*

TODO a test suite
// Create a Test Suite

const vows = require('vows');
const assert = require('assert');

vows.describe('playing a torrent video').addBatch({
    'when dividing a number by zero': {
        topic: function () { return 42 / 0 },

        'we get Infinity': function (topic) {
            assert.equal (topic, Infinity);
        }
    },
    'but when dividing zero by zero': {
        topic: function () { return 0 / 0 },

        'we get a value which': {
            'is not a number': function (topic) {
                assert.isNaN (topic);
            },
            'is not equal to itself': function (topic) {
                assert.notEqual (topic, topic);
            }
        }
    }
}).run(); // Run it
*/

