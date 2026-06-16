// Domain. Depends only on two injected ports:
//   codes: { next(): string }                         (CodeGenerator)
//   store: { save(code, longUrl), find(code): string|null }  (LinkStore)
// No I/O, no globals — see specs/architecture.md.

export class Shortener {
  constructor({ codes, store }) {
    this.codes = codes;
    this.store = store;
  }

  shorten(longUrl) {
    const code = this.codes.next();
    this.store.save(code, longUrl);
    return code;
  }

  resolve(code) {
    return this.store.find(code) ?? null;
  }
}
