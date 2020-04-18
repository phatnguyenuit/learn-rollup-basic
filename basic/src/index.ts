import { delay, fetchValue, log } from "./utils/common";

const run = async () => {
  await delay(500);
  await log(fetchValue);
};

run();

export default run;
