// Adapter implementing the LinkStore port (specs/architecture.md ADR-001).

export class InMemoryLinkStore {
  #links = new Map();

  save(code, longUrl) {
    this.#links.set(code, longUrl);
  }

  find(code) {
    return this.#links.has(code) ? this.#links.get(code) : null;
  }
}
