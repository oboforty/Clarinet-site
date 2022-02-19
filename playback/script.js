// https://stackoverflow.com/questions/22604500/web-audio-api-working-with-decibels
const log10 = x => Math.log(x)/Math.LN10;
const decibelsToGain = decibels => Math.pow(10, (decibels / 20));


const sineWaves =[
  
  {"freq":341,"val":49.066227,"idx":15},
  //{"freq":376,"val":14.056380271911621,"idx":16},

  // {"freq":1727.5,"val":15.03500,"idx":74},

  {"freq":1034,"val":14.728128433227539,"idx":44},

  {"freq":693.5,"val":12.817661,"idx":29},
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