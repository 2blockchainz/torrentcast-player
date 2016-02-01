#!/usr/bin/env node
const xtend = require('xtend');

module.exports = function(ctx, next) {
  if (ctx.mode !== 'launch') {
    return next();
  }
  ctx.options = xtend(ctx.options, ctx.options.playlist[0]);
  ctx.options.playlist.shift();
  next();
};
