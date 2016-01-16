const torrentcast = require('./index');

const wait = function(ms, callback) {
  setTimeout(callback, ms);
};

const seconds = (ms) => {
  return ms * 1000;
};

// Return of the king
const MAGNET = 'magnet:?xt=urn:btih:fdf8d3eb9cd78de60c3cbb3b68af6c8a7d560e67&dn=The+Lord+of+the+Rings%3A+The+Return+of+the+King+EXTENDED+%282003%29+72&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';

// const MAGNET = 'magnet:?xt=urn:btih:d150376fc88be8f1c5b1f8dfb543793b521e66bb&dn=South.Park.S10E04.720p.WEBRip.H264-DEADPOOL%5Brartv%5D&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';

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

