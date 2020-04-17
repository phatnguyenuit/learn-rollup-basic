'use strict';

var cbMathFun = require('cb-math-fun');

var info = (...args) => console.info(...args);

var error = (...args) => console.error(...args);

var random = (from, to) => Math.random() * (from - to) + from;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const fetchValue = async () => {
    await delay(500);
    return cbMathFun.calculate(random(8, 12), random(5, 8));
};
const log = async (factory) => {
    try {
        const value = await factory();
        info(value);
    }
    catch (err) {
        error(err);
    }
};

const run = async () => {
    await delay(500);
    await log(fetchValue);
};
run();

module.exports = run;
