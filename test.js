const Promise = require('bluebird');
const torrentcast = require('./index');

// Return of the king
const MAGNET = 'magnet:?xt=urn:btih:fdf8d3eb9cd78de60c3cbb3b68af6c8a7d560e67&dn=The+Lord+of+the+Rings%3A+The+Return+of+the+King+EXTENDED+%282003%29+72&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';

function wait(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

torrentcast(MAGNET).then((ctrl) => {

  wait(5)
  // Pause
  .then(() => {
    return ctrl.pause();
  })
  .then(() => {
    return wait(5);
  })

  // Resume
  .then(() => {
    return ctrl.resume();
  })
  .then(() => {
    return wait(5);
  })

  // Get Position, Progress
  .then(() => {
    console.log({
      position: ctrl.getPosition(),
      progress: ctrl.getProgress()
    });

    return wait(5);
  })

  // Mute
  .then(() => {
    return ctrl.mute();
  })
  .then(() => {
    console.log('muted');
    return wait(5);
  })

  // Unmute
  .then(() => {
    return ctrl.unmute();
  })
  .then(() => {
    console.log('unmuted');
    return wait(5);
  })

  // set volume to 50%
  .then(() => {
    return ctrl.setVolume(0.5);
  })
  .then(() => {
    return wait(5);
  })

  // Seek forward 30 sec
  .then(() => {
    return ctrl.seekForward(30 * 1000);
  })
  .then(() => {
    return wait(5);
  })

  // Seek backward 30 sec
  .then(() => {
    return ctrl.seekBackward(30 * 1000);
  })
  .then(() => {
    return wait(5);
  })

  // seek to beginning
  .then(() => {
    return ctrl.seekTo(0);
  })
  .then(() => {
    return wait(5);
  })

  // STOP
  .then(() => {
    return ctrl.stop();
  });
});
