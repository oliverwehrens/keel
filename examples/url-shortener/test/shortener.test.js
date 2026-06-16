// London-school unit tests: the two ports are mocked; we assert on interactions.
import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { Shortener } from "../src/shortener.js";

test("EPIC-001-S01: shorten generates a code and stores the mapping", () => {
  const codes = { next: mock.fn(() => "abc1234") };
  const store = { save: mock.fn(), find: mock.fn() };
  const shortener = new Shortener({ codes, store });

  const code = shortener.shorten("https://example.com/very/long/path");

  assert.equal(code, "abc1234");
  assert.equal(store.save.mock.callCount(), 1);
  assert.deepEqual(store.save.mock.calls[0].arguments, [
    "abc1234",
    "https://example.com/very/long/path",
  ]);
});

test("EPIC-001-S02: resolve returns the stored long URL for a known code", () => {
  const store = { save: mock.fn(), find: mock.fn(() => "https://example.com/very/long/path") };
  const shortener = new Shortener({ codes: { next: mock.fn() }, store });

  const url = shortener.resolve("abc1234");

  assert.equal(url, "https://example.com/very/long/path");
  assert.deepEqual(store.find.mock.calls[0].arguments, ["abc1234"]);
});

test("EPIC-001-S02: resolve returns null for an unknown code", () => {
  const store = { save: mock.fn(), find: mock.fn(() => null) };
  const shortener = new Shortener({ codes: { next: mock.fn() }, store });

  assert.equal(shortener.resolve("nope"), null);
});
