import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";

expect.extend(matchers);

// https://github.com/pouchdb/pouchdb/issues/8383
// @ts-ignore
window.setImmediate = (fn) => {
  setTimeout(fn, 0);
};
window.process.nextTick = (fn) => {
  setTimeout(fn, 0);
};

console.log = () => {};
console.debug = () => {};
console.error = () => {};
