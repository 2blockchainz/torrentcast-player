# torrentcast-player
A chromecast torrent streamer with API controls.

## Install

```js
npm install torrentcast-player
```

## Casting a Torrent via a magnet

```js
const player = require('torrentcast-player');
player(TORRENT_MAGNET);
```

## Controlling a Torrent via torrentcast-player API

```js
const player = require('torrentcast-player')

const wait = function(ms, callback) {
  setTimeout(callback, ms);
};

const seconds = (ms) => {
  return ms * 1000;
};

player(TORRENT_MAGNET).on('status', (status, ctrl) => {
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
```
