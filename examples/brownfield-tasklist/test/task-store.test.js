// Characterization tests — they pin the *current* behaviour described in
// specs/domains/store.md (Current capabilities).
import { test } from "node:test";
import assert from "node:assert/strict";
import { TaskStore } from "../src/task-store.js";
import { parseTask } from "../src/task.js";

test("store/add: assigns sequential ids and get returns the stored task", () => {
  const store = new TaskStore();
  const id = store.add(parseTask("[ ] buy milk #home"));
  assert.equal(id, 1);
  assert.equal(store.get(1).text, "buy milk");
});

test("store/get: returns null for an unknown id", () => {
  assert.equal(new TaskStore().get(99), null);
});

test("store/withTag: filters tasks by tag", () => {
  const store = new TaskStore();
  store.add(parseTask("[ ] buy milk #home"));
  store.add(parseTask("[ ] deploy #work"));
  const home = store.withTag("home");
  assert.equal(home.length, 1);
  assert.equal(home[0].text, "buy milk");
});

test("store/complete: marks a stored task done", () => {
  const store = new TaskStore();
  const id = store.add(parseTask("[ ] buy milk #home"));
  store.complete(id);
  assert.equal(store.get(id).done, true);
});

test("store/complete: returns null for an unknown id", () => {
  assert.equal(new TaskStore().complete(99), null);
});
