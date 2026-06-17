// In-memory store of tasks, keyed by a sequential id.
//
// Pre-existing code: written without a spec. sdd-adopt reverse-engineered
// specs/domains/store.md from it.

import { completeTask } from "./task.js";

export class TaskStore {
  #tasks = new Map();
  #nextId = 1;

  add(task) {
    const id = this.#nextId++;
    this.#tasks.set(id, { ...task, id });
    return id;
  }

  get(id) {
    return this.#tasks.get(id) ?? null;
  }

  all() {
    return [...this.#tasks.values()];
  }

  withTag(tag) {
    return this.all().filter((t) => t.tags.includes(tag));
  }

  complete(id) {
    const task = this.#tasks.get(id);
    if (!task) return null;
    const done = completeTask(task);
    this.#tasks.set(id, done);
    return done;
  }
}
