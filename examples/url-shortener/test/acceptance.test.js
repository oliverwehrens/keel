// Outer (acceptance) test for EPIC-001 — real adapters wired end to end.
import { test } from "node:test";
import assert from "node:assert/strict";
import { Shortener } from "../src/shortener.js";
import { InMemoryLinkStore } from "../src/in-memory-link-store.js";
import { RandomCodeGenerator } from "../src/random-code-generator.js";

test("EPIC-001: a shortened URL resolves back to the exact original", () => {
  const shortener = new Shortener({
    codes: new RandomCodeGenerator(),
    store: new InMemoryLinkStore(),
  });
  const longUrl = "https://example.com/some/very/long/path?q=1";

  const code = shortener.shorten(longUrl);

  assert.match(code, /^[a-z0-9]{7}$/);
  assert.equal(shortener.resolve(code), longUrl);
});
