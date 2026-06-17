# Glossary — ubiquitous language

> Terms found in the code and tests by `sdd-adopt`, then ratified. One definition per term.

| Term     | Definition                                                              | Synonyms to avoid       |
| -------- | ----------------------------------------------------------------------- | ----------------------- |
| Task     | A single to-do item: `{ text, tags, done }` (gets an `id` once stored). | "todo", "item", "entry" |
| Tag      | A `#word` label on a task, used to group and filter.                    | "label", "category"     |
| Done     | The boolean completion flag on a task (`[x]` in a task line).           | "complete", "closed"    |
| Task line| The text form of a task, e.g. `[ ] buy milk #home`.                     | "string", "raw"         |
| Store    | The in-memory collection of tasks, keyed by id.                         | "repo", "db", "list"    |
