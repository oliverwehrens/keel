// Adapter implementing the CodeGenerator port (specs/architecture.md ADR-002).
// Random fixed-length base-36 token.

const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

export class RandomCodeGenerator {
  constructor(length = 7) {
    this.length = length;
  }

  next() {
    let code = "";
    for (let i = 0; i < this.length; i++) {
      code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
    return code;
  }
}
