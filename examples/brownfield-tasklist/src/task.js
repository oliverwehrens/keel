// Task parsing and formatting.
// A task is a single line like:  "[ ] buy milk #home #errand"
//   "[x]" means done; "#word" tokens are tags.
//
// Pre-existing code: this library was written without a spec. sdd-adopt
// reverse-engineered specs/domains/task.md from it.

const LINE = /^\[(x| )\]\s+(.+)$/;
const TAG = /#([a-z0-9-]+)/gi;

export function parseTask(line) {
  const m = LINE.exec(line.trim());
  if (!m) throw new Error(`not a task line: "${line}"`);
  const rest = m[2];
  const tags = [...rest.matchAll(TAG)].map((x) => x[1]);
  const text = rest.replace(TAG, "").replace(/\s+/g, " ").trim();
  return { text, tags, done: m[1] === "x" };
}

export function formatTask(task) {
  const box = task.done ? "[x]" : "[ ]";
  const tags = (task.tags || []).map((t) => `#${t}`).join(" ");
  return [box, task.text, tags].filter(Boolean).join(" ");
}

export function completeTask(task) {
  return { ...task, done: true };
}
