# torrentcast-player
A Chromecast torrent streamer with API controls.

## Install

```
npm install torrentcast-player
```

## Casting a Torrent via a magnet

```js
const player = require('torrentcast-player');
player(TORRENT_MAGNET);
```

## Controlling a Torrent via torrentcast-player API

```js
const torrentcast = require('torrentcast-player');
const MAGNET = '>>>> magent goes here <<<<';

torrentcast(MAGNET).then((ctrl) => {
  
  ctrl.pause().then(() => {
    // paused
  });
  
  ctrl.resume().then(() => {
    // resumed
  });
  
  ctrl.mute(() => {
    // muted
  });
  
  ctrl.unmute(() => {
    // unmuted
  });
  
  ctrl.setVolume(0.5).then(() => {
    // volume set to 50%
  });
  
  ctrl.seekTo(time); // seeks to the given time.
  
  ctrl.getPosition(); // gets the position of the movie in milliseconds.
  ctrl.getProgress(); // gets the progress of the movie as a percentage.
  
  ctrl.stop(() => {
    // stopped
  });
});
```

## Dependencies
Node 5

#### Installing Node 5 with [NVM](https://github.com/creationix/nvm)
```
nvm install 5
nvm use 5
```

## Coming Soon
* [ ] A web interface for basic torrent+Chromecast controls (#1)
* [x] API will return [Promises Promises](https://youtu.be/WBupia9oidU)
* [x] A simpler way to access the controller, rather than waiting for the status to equal `'playing'`
* [ ] Tests
* [ ] Multiple Chromecast selection
* [ ] Attaching to a Chromecast player instance
