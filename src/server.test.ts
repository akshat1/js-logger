import { suite, test } from "node:test";
import { strict as assert } from "node:assert";
import { getLogger } from "./index.js";
import { getColorizedName } from "./server.js";

// @TODO: Create a similar file for browser.ts.
suite("Server", () => {
  test("should log messages", (t) => {
    const dNow = 1722156120225; // Date.now when I wrote the test. Need a predefined date to compare the output.
    const expectedISOString = "2024-07-28T08:42:00.225Z"; // The expected output of new Date(dNow).toISOString().
    t.mock.timers.enable({ apis: ["Date"], now: dNow });
    t.mock.method(console, "debug", () => { });
    t.mock.method(console, "error", () => { });
    t.mock.method(console, "info");
    t.mock.method(console, "log", () => { });
    t.mock.method(console, "warn", () => { });
    const logger = getLogger("test");
    logger.debug("Hello, Debug!");
    // @ts-ignore
    assert.equal(console.debug.mock.callCount(), 1);
    // @ts-ignore
    assert.deepEqual(console.debug.mock.calls[0].arguments, [
        `[${expectedISOString} ${getColorizedName(logger)}]`,
        "Hello, Debug!"
    ]);
    logger.error("Hello, Error!");
    // @ts-ignore
    assert.equal(console.error.mock.callCount(), 1);
    // @ts-ignore
    assert.deepEqual(console.error.mock.calls[0].arguments, [
        `[${expectedISOString} ${getColorizedName(logger)}]`,
        "Hello, Error!"
    ]);
    logger.info("Hello, Info!");
    // @ts-ignore
    assert.equal(console.info.mock.callCount(), 1);
    // @ts-ignore
    assert.deepEqual(console.info.mock.calls[0].arguments, [
        `[${expectedISOString} ${getColorizedName(logger)}]`,
        "Hello, Info!"
    ]);
    logger.log("Hello, Log!");
    // @ts-ignore
    assert.equal(console.log.mock.callCount(), 1);
    // @ts-ignore
    assert.deepEqual(console.log.mock.calls[0].arguments, [
        `[${expectedISOString} ${getColorizedName(logger)}]`,
        "Hello, Log!"
    ]);
    logger.warn("Hello, Warn!");
    // @ts-ignore
    assert.equal(console.warn.mock.callCount(), 1);
    // @ts-ignore
    assert.deepEqual(console.warn.mock.calls[0].arguments, [
        `[${expectedISOString} ${getColorizedName(logger)}]`,
        "Hello, Warn!"
    ]);
  });
});
