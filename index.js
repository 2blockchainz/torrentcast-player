#!/usr/bin/env node

const player = require('chromecast-player')();
const xtend = require('xtend');
const torrent = require('./lib/torrent');

player.use(torrent);

player.use(function(ctx, next) {
  if (ctx.mode !== 'launch') {
    return next();
  }
  ctx.options = xtend(ctx.options, ctx.options.playlist[0]);
  ctx.options.playlist.shift();
  next();
});

process.on('SIGINT', function() {
  process.exit();
});

module.exports = function torrentcast(magnet, optionalController) {
  var options = {
    playlist: [{ path: magnet }]
  };

  player.launch(options, optionalController);

  return {
    on: (eventName, callback) => {
      player.use((ctx, next) => {
        'use strict';

        let controller = {
          // TODO, return Promises
          pause: (callback) => {
            ctx.player.pause(callback);
          },
          resume (callback) {
            ctx.player.play(callback);
          },
          stop (callback) {
            ctx.player.stop(callback);
          },
          mute (callback) {
            ctx.player.mute(callback);
          },
          unmute (callback) {
            ctx.player.unmute(callback);
          },
          play (magnet, optionalController) {
            var options = {
              playlist: [{ path: magnet }]
            };
            player.launch(options, optionalController);
          },
          setVolume (volume, callback) {
            ctx.player.setVolume(volume, callback);
          },
          getVolume (callback) {
            ctx.player.getVolume(callback);
          },
          incrementVolume (callback) {
            var volume = this.getVolume();
            var incrementedVolume = Math.round((volume + 0.1) * 10) / 10;
            var maxVolume = 1; // TODO const
            var newVolume = Math.ceil(maxVolume, incrementedVolume);

            ctx.player.setVolume(newVolume, callback);
          },
          decrementVolume (callback) {
            var volume = this.getVolume();
            var incrementedVolume = Math.round((volume - 0.1) * 10) / 10;
            var minVolume = 0; // TODO const
            var newVolume = Math.floor(minVolume, incrementedVolume);

            ctx.player.setVolume(newVolume, callback);
          },
          next () {
            // TODO
          },
          queue (magnet) {
            // TODO
          },
          shutdown () {
            ctx.shutdown();
          }
        };

        ctx.on(eventName, (status) => {
          callback(status, controller);
        });

        process.on('SIGINT', function() {
          ctx.shutdown();
        });
        
        next();
      });
    }
  };
};

