#!/usr/bin/env node

const player     = require('chromecast-player')();
const torrent    = require('./lib/torrent');
const middleware = require('./lib/middleware');
const Promise    = require('bluebird');

const MIN_POSITION = 0;
const MIN_VOLUME   = 0;
const MAX_VOLUME   = 1;

player.use(torrent);
player.use(middleware);

function Controller(config) {
  this._player = config.player;
}

Controller.prototype = {
  getStatusChange() {
    return new Promise((resolve, reject) => {
      this._player.once('status', (error, status) => {
        if (error) {
          return reject(error);
        }

        resolve(status);
      });
    });
  },
  pause () {
    return new Promise((resolve, reject) => {
      this._player.pause(resolve, reject);
    });
  },
  resume () {
    return new Promise((resolve, reject) => {
      this._player.play(resolve, reject);
    });
  },
  mute () {
    return new Promise((resolve, reject) => {
      this._player.mute(resolve, reject);
    });
  },
  unmute () {
    return new Promise((resolve, reject) => {
      this._player.unmute(resolve, reject);
    });
  },
  setVolume (volume) {
    return new Promise((resolve, reject) => {
      this._player.setVolume(volume, resolve, reject);
    });
  },
  getVolume () {
    return new Promise((resolve, reject) => {
      this._player.getVolume(resolve, reject);
    });
  },

  incrementVolume () {
    return new Promise((resolve, reject) => {
      this.getVolume().then((volume) => {
        'use strict';

        let incrementedVolume = Math.round((volume + 0.1) * 10) / 10;
        let newVolume = Math.max(MAX_VOLUME, incrementedVolume);

        return this.setVolume(newVolume)
        .then(resolve)
        .catch(reject);
      });
    });
  },
  decrementVolume () {
    return new Promise((resolve, reject) => {
      this.getVolume().then((volume) => {
        'use strict';

        let decrementedVolume = Math.round((volume - 0.1) * 10) / 10;
        let newVolume = Math.min(MIN_VOLUME, incrementedVolume);

        return this.setVolume(newVolume)
        .then(resolve)
        .catch(reject);
      });
    });
  },

  seekTo (position) {
    return new Promise((resolve, reject) => {
      if (position < 0) {
        position = 0;
      }

      this._player.seek(position, resolve, reject);
    });
  },
  seekForward (ms) {
    'use strict';
    if (!ms) {
      return Error('seekForward requires `ms` to seek');
    }
    let position           = this.getPosition(); // ms
    let newPosition        = Math.round((position + ms) * 10) / 10;
    let newPositionSeconds = newPosition / 1000;
    let newPositionMinutes = newPositionSeconds * 60;

    return this.seekTo(newPositionMinutes);
  },

  seekBackward (ms) {
    'use strict';
    if (!ms) {
      return Error('seekForward requires `ms` to seek');
    }

    let position           = this.getPosition(); // ms
    let newPosition        = Math.round((position - ms) * 10) / 10;
    let newPositionSeconds = newPosition / 1000;
    let newPositionMinutes = newPositionSeconds * 60;

    return this.seekTo(newPositionMinutes);
  },

  // sync
  getPosition (position) {
    return this._player.getPosition();
    return new Promise((resolve, reject) => {
      this._player.getPosition(resolve, reject);
    });
  },

  // sync
  getProgress (position) {
    return this._player.getProgress();
    return new Promise((resolve, reject) => {
      this._player.getProgress(resolve, reject);
    });
  },

  stop () {
    return new Promise((resolve, reject) => {
      this._player.stop(resolve, reject);
    });
  },

  // TODO
  // next() { },
  // queue() { },

  shutdown () {
    this._player.shutdown();
  }
};

module.exports = function torrentcast(magnet) {
  var options = {
    playlist: [{ path: magnet }]
  };

  return new Promise((resolve, reject) => {
    player.launch(options, (error, player) => {
      if (error) {
        return reject(error);
      }
      resolve(new Controller({player}));
    });
  });
};

process.on('SIGINT', function() {
  process.exit();
});
