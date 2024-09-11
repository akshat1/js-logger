import { test, suite } from "node:test";
import { strict as assert } from "node:assert";
import { getLogger } from "./index.js";

// @TODO: Move most of these tests into server.test.ts.
// @TODO: Create a similar file for browser.ts.

suite("Logger", () => {
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
});
