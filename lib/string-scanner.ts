/**
 * Scans over a string, character by character
 */
export default class StringScanner {
  pos: number = 0

  constructor(private readonly data: string) {}

  /**
   * Fetch the next character.
   */
  next(): string | undefined {
    return this.data[this.pos++]
  }

  /**
   * Peek at the next character.
   */
  peek(): string | undefined {
    return this.data[this.pos + 1]
  }

  /**
   * Rewind the position by 1.
   */
  rewind(): void {
    const newPos = this.pos - 1
    this.pos = newPos < 0 ? 0 : newPos
  }
}
