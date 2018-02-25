import Wad from 'web-audio-daw';

const getRangeNormalizer = (targetMin, targetMax) => (min, max, value) => {
  return (targetMax - targetMin)/(max - min)*(value-max) + targetMax
};

export const FILTER_TYPES = [
  'Chorus',
  'Delay',
  'Phaser',
  'Overdrive',
  'Compressor',
  'Tremolo',
  'WahWah',
  'Bitcrusher',
  'MoogFilter',
  'PingPongDelay'
];

// An object of all possible filters with normalization functions to calculate
// each parameter
const FILTER_FRAMES = {
  Chorus: {
    rate: getRangeNormalizer(0.01, 8),
    feedback: getRangeNormalizer(0, 1),
    delay: getRangeNormalizer(0, 1),
    bypass: 0
  },
  Delay: {
    feedback: getRangeNormalizer(0, 1),
    delayTime: getRangeNormalizer(1, 10000),
    wetLevel: getRangeNormalizer(0, 1),
    dryLevel: getRangeNormalizer(0, 1),
    cutoff: getRangeNormalizer(20, 22050),
    bypass: 0
  },
  Phaser: {
    rate: getRangeNormalizer(0.01, 8),
    depth: getRangeNormalizer(0, 1),
    feedback: getRangeNormalizer(0, 1),
    stereoPhase: getRangeNormalizer(0, 180),
    baseModulationFrequency: getRangeNormalizer(500, 1500),
    bypass: 0
  },
  Overdrive: {
    outputGain: getRangeNormalizer(0, 1),
    drive: getRangeNormalizer(0, 1),
    curveAmount: getRangeNormalizer(0, 1),
    algorithmIndex: getRangeNormalizer(0, 5),
    bypass: 0
  },
  Compressor: {
    threshold: getRangeNormalizer(-100, 0),
    makeupGain: getRangeNormalizer(0, 40),
    attack: getRangeNormalizer(0, 1000),
    release: getRangeNormalizer(0, 3000),
    ratio: getRangeNormalizer(1, 20),
    knee: getRangeNormalizer(0, 40),
    automakeup: true,
    bypass: 0
  },
  Tremolo: {
    intensity: getRangeNormalizer(0, 1),
    rate: getRangeNormalizer(0.001, 8),
    stereoPhase: getRangeNormalizer(0, 180),
    bypass: 0
  },
  WahWah: {
    automode: true,
    baseFrequency: getRangeNormalizer(0, 1),
    excursionOctaves: getRangeNormalizer(1, 6),
    sweep: getRangeNormalizer(0, 1),
    resonance: getRangeNormalizer(1, 100),
    sensitivity: getRangeNormalizer(-1, 1),
    bypass: 0
  },
  Bitcrusher: {
    bits: getRangeNormalizer(1, 16),
    normfreq: getRangeNormalizer(0, 1),
    bufferSize: getRangeNormalizer(256, 16384)
  },
  MoogFilter: {
    cutoff: getRangeNormalizer(0, 1),
    resonance: getRangeNormalizer(0, 4),
    bufferSize: getRangeNormalizer(256, 16384)
  },
  PingPongDelay: {
    wetLevel: getRangeNormalizer(0, 1),
    feedback: getRangeNormalizer(0, 1),
    delayTimeLeft: getRangeNormalizer(1, 10000),
    delayTimeRight: getRangeNormalizer(1, 10000)
  }
};

export const getFilterFrame = (filterType) => {
  return FILTER_FRAMES[filterType];
};

export const constructFilter = (filterFrame, palette) => {

};
