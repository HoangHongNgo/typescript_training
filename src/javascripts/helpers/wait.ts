/**
 * A promise for wait until the next action.
 * @param {Number} time
 * @returns {Promise<void>} Promise resolved
 */
const wait = (time: number) =>
  new Promise((resolve: Function) => {
    setTimeout(() => resolve(), time);
  });

export default wait;
