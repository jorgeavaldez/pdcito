import Tuna from 'tunajs';

// helper function, just used to separate the normalizers from the precalculated
// constant parameters
const isFunction = (functionToCheck) => {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
};

const getRangeNormalizer = (targetMin, targetMax, transform) => (min, max, value) => {
  const normalized = (targetMax - targetMin)/(max - min)*(value-max) + targetMax;

  // transform allows us to pass in a rounding function or something similar
  // the transform is applied after normalization
  if (transform) {
    return transform(normalized);
  }

  return normalized;
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
    algorithmIndex: getRangeNormalizer(0, 5, Math.round),
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
    bits: getRangeNormalizer(1, 16, Math.round),
    normfreq: getRangeNormalizer(0, 1),
    bufferSize: getRangeNormalizer(256, 16384, (number) => {
      const choices = [256, 512, 1024, 2048, 4096, 8192, 16384];

      let curr = choices[0];
      for (let i = 0; i < choices.length; i++) {
        if (Math.abs(number - choices[i]) < Math.abs(number - curr)) {
          curr = choices[i];
        }
      }

      return curr;
    })
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
  // get swatch with the highest use in the image
  const swatches = Object.values(palette);

  let maxPop = -1;
  let maxPopIndex = -1;
  for (let i = 0; i < swatches.length; i++) {
    const currPop = swatches[i].getPopulation();
    if (currPop > maxPop) {
      maxPop = currPop;
      maxPopIndex = i;
    }
  }

  const mostPopulated = swatches[maxPopIndex];

  const hsl = mostPopulated.getHsl();
  const rgb = mostPopulated.getRgb();

  // some of the parameters don't need values
  const frameParams = Object.keys(filterFrame).reduce((acc, param) => {
    if (isFunction(filterFrame[param])) return [...acc, param];
    else return acc;
  }, []);

  const finalFilter = {};

  for(let i = 0; i < frameParams.length; i++) {
    const currParam = frameParams[i];
    const normalizer = filterFrame[currParam];

    // use hsl values
    if (i < 3) {
      finalFilter[currParam] = normalizer(0, 1, hsl[i]);
    }

    // use rgb values
    else {
      finalFilter[currParam] = normalizer(0, 255, rgb[i - 3]);
    }
  }

  // now we need to add the ones that are missing
  Object.keys(filterFrame).forEach((param) => {
    if (!isFunction(filterFrame[param]))
      finalFilter[param] = filterFrame[param];
  });

  return finalFilter;
};

export const createTuna = (audioContext) => {
  return new Tuna(audioContext);
};

export const createTunaFilter = (tuna, filterType, filterBody) => {
  const filterConstructor = tuna[filterType];
  return new filterConstructor(filterBody);
};
