// Characterization tests — they pin the *current* behaviour described in
// specs/domains/task.md (Current capabilities). They lock in what is, not
// what we wish.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseTask, formatTask, completeTask } from "../src/task.js";

test("task/parse: extracts text, tags, and the done flag", () => {
  assert.deepEqual(parseTask("[ ] buy milk #home #errand"), {
    text: "buy milk",
    tags: ["home", "errand"],
    done: false,
  });
});

test("task/parse: reads [x] as done", () => {
  assert.equal(parseTask("[x] ship release").done, true);
});

test("task/parse: rejects a line that isn't a task", () => {
  assert.throws(() => parseTask("just some text"));
});

test("task/format: round-trips a parsed task", () => {
  const line = "[ ] buy milk #home";
  assert.equal(formatTask(parseTask(line)), line);
});

test("task/complete: marks done without mutating the original", () => {
  const task = parseTask("[ ] write tests");
  const done = completeTask(task);
  assert.equal(done.done, true);
  assert.equal(task.done, false);
});
