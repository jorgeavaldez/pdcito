import * as Vibrant from 'node-vibrant';

export const getImageComponents = (image) => {
  const v = new Vibrant(image);
  return v.getPalette();
};
