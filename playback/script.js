// https://stackoverflow.com/questions/22604500/web-audio-api-working-with-decibels
const log10 = x => Math.log(x)/Math.LN10;
const decibelsToGain = decibels => Math.pow(10, (decibels / 20));


const sineWaves =[
  {"freq":635,"val":82.52731323242188,"idx":29},
  {"freq":656,"val":74.86335754394531,"idx":30},
  {"freq":613,"val":13.083337783813477,"idx":28},
  {"freq":678,"val":9.00784969329834,"idx":31},
  // {"freq":1280,"val":2.0287652015686035,"idx":59},
  // {"freq":1258,"val":1.1513028144836426,"idx":58},
  // {"freq":527,"val":1.1031060218811035,"idx":24},
  // {"freq":549,"val":0.8388165831565857,"idx":25}
]

const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
let collectiveGain = null;

document.querySelector('[data-action="play-flute"]').addEventListener('click', evt => {
  audioCtx.resume();
  if (collectiveGain) {
    collectiveGain.disconnect();
  }
  collectiveGain = audioCtx.createGain();
  collectiveGain.gain.value = 3;
  collectiveGain.connect(audioCtx.destination);

  sineWaves.forEach(wave => {
    const gainValue = decibelsToGain(-wave.val);
    const oscillator = new OscillatorNode(audioCtx);
    const gain = audioCtx.createGain();
    oscillator.frequency.setValueAtTime(wave.freq, 0.0);
    gain.gain.value = gainValue;
    oscillator.connect(gain).connect(collectiveGain);
    oscillator.start();

  });
});

document.querySelector('[data-action="stop-flute"]').addEventListener('click', evt => {
  audioCtx.suspend();
});