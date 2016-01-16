#!/usr/bin/env node

/* 

xat/castnow's torrent plugin with some minor code formatting.

*/

const readTorrent = require('read-torrent');
const peerflix = require('peerflix');
const internalIp = require('internal-ip');
const port = 4102;

const pick = require('lodash').pick;

var prefixFilter = function(options, prefix) {
  const hasPrefix = function(value, keyName) {
    return (keyName.substr(0, prefix.length) === prefix);
  }
  return pick(options, hasPrefix)
};

var torrent = function(ctx, next) {
  if (ctx.mode !== 'launch') {
    return next();
  }

  if (ctx.options.playlist.length > 1) {
    return next();
  }

  var path = ctx.options.playlist[0].path;

  if (!/^magnet:/.test(path) &&
      !/torrent$/.test(path) &&
      !ctx.options.torrent) {
    return next();
  }

  readTorrent(path, function(err, torrent) {
    if (err) {
      console.log('error reading torrent: %o', err);
      return next();
    }

    if (!ctx.options['peerflix-port']) {
      ctx.options['peerflix-port'] = port;
    }

    var peerflixOptions = prefixFilter(ctx.options, 'peerflix-');

    var engine = peerflix(torrent, peerflixOptions);

    var ip = ctx.options.myip || internalIp();

    engine.server.once('listening', function() {
      console.log('started webserver on address %s using port %s', ip, engine.server.address().port);
      ctx.options.playlist[0] = {
        path: `http://${ip}:${engine.server.address().port}`,
        type: 'video/mp4',
        media: {
          metadata: {
            title: engine.server.index.name
          }
        }
      };
      next();
    });
  });
};

module.exports = torrent;

