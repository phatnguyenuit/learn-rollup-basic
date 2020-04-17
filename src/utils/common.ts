/**
 * Needs @rollup/plugin-node-resolve to resolve node modules
 * Needs @rollup/plugin-commonjs to convert CommonJS to ES2015 module
 */
import { error, info } from "cb-logger-fun";
/**
 * Needs @rollup/plugin-node-resolve to resolve node modules
 * Doesn't need @rollup/plugin-commonjs because it does provide ES2015 module via "module" entry in package.json
 */
import random from "cb-random-fun";
/**
 * This library is treated as external in Rollup config
 */
import { calculate } from "cb-math-fun";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchValue = async () => {
  await delay(500);
  return calculate(random(8, 12), random(5, 8));
};

export const log = async <TValue>(factory: () => Promise<TValue>) => {
  try {
    const value = await factory();
    info(value);
  } catch (err) {
    error(err);
  }
};
