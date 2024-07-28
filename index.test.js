import { mock, test } from "node:test";
import { strict as assert } from "node:assert";
import { getLogger } from "./index.js";

test("should return a logger object", () => {
  const logger = getLogger("test");
  assert.ok(logger);
  assert.equal(typeof logger.debug, "function");
  assert.equal(typeof logger.error, "function");
  assert.equal(typeof logger.info, "function");
  assert.equal(typeof logger.log, "function");
  assert.equal(typeof logger.warn, "function");
  assert.equal(typeof logger.getName, "function");
});

test("should return a logger object with the correct name", () => {
  const logger = getLogger("test");
  assert.equal(logger.getName(), "test");
});

test("should return a logger object with the correct parent name", () => {
  const parent = getLogger("parent");
  const logger = getLogger("child", parent);
  assert.equal(logger.getName(), "parent > child");
});

test("should log messages", (t) => {
  const dNow = 1722156120225; // Date.now when I wrote the test. Need a predefined date to compare the output.
  const expectedISOString = "2024-07-28T08:42:00.225Z";  // The expected output of new Date(dNow).toISOString().
  t.mock.timers.enable({ apis: ["Date"], now: dNow });
  t.mock.method(console, "debug", () => {});
  t.mock.method(console, "error", () => {});
  t.mock.method(console, "info");
  t.mock.method(console, "log", () => {});
  t.mock.method(console, "warn", () => {});
  const logger = getLogger("test");

  logger.debug("Hello, Debug!");
  assert.equal(console.debug.mock.callCount(), 1);
  assert.deepEqual(console.debug.mock.calls[0].arguments, [
    `[${expectedISOString} test]`,
    "Hello, Debug!"
  ]);

  logger.error("Hello, Error!");
  assert.equal(console.error.mock.callCount(), 1);
  assert.deepEqual(console.error.mock.calls[0].arguments, [
    `[${expectedISOString} test]`,
    "Hello, Error!"
  ]);

  logger.info("Hello, Info!");
  assert.equal(console.info.mock.callCount(), 1);
  assert.deepEqual(console.info.mock.calls[0].arguments, [
    `[${expectedISOString} test]`,
    "Hello, Info!"
  ]);

  logger.log("Hello, Log!");
  assert.equal(console.log.mock.callCount(), 1);
  assert.deepEqual(console.log.mock.calls[0].arguments, [
    `[${expectedISOString} test]`,
    "Hello, Log!"
  ]);

  logger.warn("Hello, Warn!");
  assert.equal(console.warn.mock.callCount(), 1);
  assert.deepEqual(console.warn.mock.calls[0].arguments, [
    `[${expectedISOString} test]`,
    "Hello, Warn!"
  ]);
});
